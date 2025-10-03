<?php
require_once 'vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JWTUtil {
    private static $secret_key = "artceiling_secret_key_2024";
    private static $issuer = "artceiling_api";
    private static $audience = "artceiling_users";
    private static $issuer_claim = "artceiling_api";
    private static $audience_claim = "artceiling_users";

    public static function generateToken($admin_id, $email) {
        $issued_at = time();
        $expiration_time = $issued_at + (24 * 60 * 60); // 24 hours
        $issuer = self::$issuer;
        $audience = self::$audience;

        $payload = array(
            "iss" => $issuer,
            "aud" => $audience,
            "iat" => $issued_at,
            "exp" => $expiration_time,
            "data" => array(
                "id" => $admin_id,
                "email" => $email
            )
        );

        return JWT::encode($payload, self::$secret_key, 'HS256');
    }

    public static function validateToken($token) {
        try {
            $decoded = JWT::decode($token, new Key(self::$secret_key, 'HS256'));
            return (array) $decoded;
        } catch (Exception $e) {
            return false;
        }
    }

    public static function getTokenFromHeaders() {
        $headers = getallheaders();

        if (isset($headers['Authorization'])) {
            $auth_header = $headers['Authorization'];
            if (preg_match('/Bearer\s(\S+)/', $auth_header, $matches)) {
                return $matches[1];
            }
        }

        return null;
    }

    public static function requireAuth() {
        $token = self::getTokenFromHeaders();

        if (!$token) {
            http_response_code(401);
            echo json_encode(array("message" => "Access denied. No token provided."));
            exit();
        }

        $decoded = self::validateToken($token);

        if (!$decoded) {
            http_response_code(401);
            echo json_encode(array("message" => "Invalid token."));
            exit();
        }

        return $decoded;
    }
}
?>