<?php
class Admin {
    private $conn;
    private $table_name = "admins";

    public $id;
    public $email;
    public $password;
    public $created_at;
    public $updated_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function login($email, $password) {
        $query = "SELECT id, email, password FROM " . $this->table_name . " WHERE email = ? LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $email);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if (password_verify($password, $row['password'])) {
                $this->id = $row['id'];
                $this->email = $row['email'];
                return true;
            }
        }
        return false;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . " SET email=:email, password=:password";
        $stmt = $this->conn->prepare($query);

        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->password = password_hash($this->password, PASSWORD_DEFAULT);

        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":password", $this->password);

        return $stmt->execute();
    }

    public function emailExists() {
        $query = "SELECT id FROM " . $this->table_name . " WHERE email = ? LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->email);
        $stmt->execute();

        return $stmt->rowCount() > 0;
    }
}
?>