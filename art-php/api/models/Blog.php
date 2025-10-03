<?php
class Blog {
    private $conn;
    private $table_name = "blogs";

    public $id;
    public $title;
    public $content;
    public $excerpt;
    public $main_image_path;
    public $author;
    public $featured;
    public $created_at;
    public $updated_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function read() {
        $query = "SELECT id, title, content, excerpt, main_image_path, author, featured, created_at
                  FROM " . $this->table_name . "
                  ORDER BY created_at DESC
                  LIMIT 8";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function readOne() {
        $query = "SELECT id, title, content, excerpt, main_image_path, author, featured, created_at
                  FROM " . $this->table_name . "
                  WHERE id = ? LIMIT 1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $this->title = $row['title'];
            $this->content = $row['content'];
            $this->excerpt = $row['excerpt'];
            $this->main_image_path = $row['main_image_path'];
            $this->author = $row['author'];
            $this->featured = $row['featured'];
            $this->created_at = $row['created_at'];

            return true;
        }

        return false;
    }

    public function create() {
        // Check if we already have 8 blogs
        $count_query = "SELECT COUNT(*) as total FROM " . $this->table_name;
        $count_stmt = $this->conn->prepare($count_query);
        $count_stmt->execute();
        $count_result = $count_stmt->fetch(PDO::FETCH_ASSOC);

        if ($count_result['total'] >= 8) {
            return false; // Max 8 blogs reached
        }

        $query = "INSERT INTO " . $this->table_name . "
                  SET title=:title, content=:content, excerpt=:excerpt,
                      main_image_path=:main_image_path, author=:author, featured=:featured";

        $stmt = $this->conn->prepare($query);

        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->content = htmlspecialchars(strip_tags($this->content));
        $this->excerpt = htmlspecialchars(strip_tags($this->excerpt));
        $this->main_image_path = htmlspecialchars(strip_tags($this->main_image_path));
        $this->author = htmlspecialchars(strip_tags($this->author));
        $this->featured = $this->featured ? 1 : 0;

        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":content", $this->content);
        $stmt->bindParam(":excerpt", $this->excerpt);
        $stmt->bindParam(":main_image_path", $this->main_image_path);
        $stmt->bindParam(":author", $this->author);
        $stmt->bindParam(":featured", $this->featured);

        if ($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }

        return false;
    }

    public function update() {
        $query = "UPDATE " . $this->table_name . "
                  SET title=:title, content=:content, excerpt=:excerpt,
                      main_image_path=:main_image_path, author=:author, featured=:featured
                  WHERE id=:id";

        $stmt = $this->conn->prepare($query);

        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->content = htmlspecialchars(strip_tags($this->content));
        $this->excerpt = htmlspecialchars(strip_tags($this->excerpt));
        $this->main_image_path = htmlspecialchars(strip_tags($this->main_image_path));
        $this->author = htmlspecialchars(strip_tags($this->author));
        $this->featured = $this->featured ? 1 : 0;

        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":content", $this->content);
        $stmt->bindParam(":excerpt", $this->excerpt);
        $stmt->bindParam(":main_image_path", $this->main_image_path);
        $stmt->bindParam(":author", $this->author);
        $stmt->bindParam(":featured", $this->featured);
        $stmt->bindParam(":id", $this->id);

        return $stmt->execute();
    }

    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);

        return $stmt->execute();
    }

    public function getFeatured() {
        $query = "SELECT id, title, content, excerpt, main_image_path, author, featured, created_at
                  FROM " . $this->table_name . "
                  WHERE featured = 1
                  ORDER BY created_at DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function getCount() {
        $query = "SELECT COUNT(*) as total FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result['total'];
    }
}
?>