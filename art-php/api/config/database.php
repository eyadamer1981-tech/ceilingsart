<?php
require_once 'config.php';

class Database {
    private $conn;

    public function __construct() {
        $config = Config::getDbConfig();
        $this->host = $config['host'];
        $this->db_name = $config['dbname'];
        $this->username = $config['username'];
        $this->password = $config['password'];
    }

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=utf8mb4",
                $this->username,
                $this->password,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false
                ]
            );
        } catch(PDOException $exception) {
            if (Config::DEBUG_MODE) {
                echo json_encode(['error' => 'Connection error: ' . $exception->getMessage()]);
            } else {
                echo json_encode(['error' => 'Database connection failed']);
            }
            exit();
        }

        return $this->conn;
    }
}
?>