<?php
class Project {
    private $conn;
    private $table_name = "projects";
    private $images_table = "project_images";

    public $id;
    public $title;
    public $description_en;
    public $description_ar;
    public $category;
    public $main_image_path;
    public $featured;
    public $created_at;
    public $updated_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function read() {
        $query = "SELECT id, title, description_en, description_ar, category, main_image_path, featured, created_at
                  FROM " . $this->table_name . "
                  ORDER BY created_at DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function readLight() {
        $query = "SELECT id, title, category, main_image_path, featured, created_at
                  FROM " . $this->table_name . "
                  ORDER BY created_at DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function readOne() {
        $query = "SELECT id, title, description_en, description_ar, category, main_image_path, featured, created_at
                  FROM " . $this->table_name . "
                  WHERE id = ? LIMIT 1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $this->title = $row['title'];
            $this->description_en = $row['description_en'];
            $this->description_ar = $row['description_ar'];
            $this->category = $row['category'];
            $this->main_image_path = $row['main_image_path'];
            $this->featured = $row['featured'];
            $this->created_at = $row['created_at'];

            return true;
        }

        return false;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . "
                  SET title=:title, description_en=:description_en, description_ar=:description_ar,
                      category=:category, main_image_path=:main_image_path, featured=:featured";

        $stmt = $this->conn->prepare($query);

        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->description_en = htmlspecialchars(strip_tags($this->description_en));
        $this->description_ar = htmlspecialchars(strip_tags($this->description_ar));
        $this->category = htmlspecialchars(strip_tags($this->category));
        $this->main_image_path = htmlspecialchars(strip_tags($this->main_image_path));
        $this->featured = $this->featured ? 1 : 0;

        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":description_en", $this->description_en);
        $stmt->bindParam(":description_ar", $this->description_ar);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":main_image_path", $this->main_image_path);
        $stmt->bindParam(":featured", $this->featured);

        if ($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }

        return false;
    }

    public function update() {
        $query = "UPDATE " . $this->table_name . "
                  SET title=:title, description_en=:description_en, description_ar=:description_ar,
                      category=:category, main_image_path=:main_image_path, featured=:featured
                  WHERE id=:id";

        $stmt = $this->conn->prepare($query);

        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->description_en = htmlspecialchars(strip_tags($this->description_en));
        $this->description_ar = htmlspecialchars(strip_tags($this->description_ar));
        $this->category = htmlspecialchars(strip_tags($this->category));
        $this->main_image_path = htmlspecialchars(strip_tags($this->main_image_path));
        $this->featured = $this->featured ? 1 : 0;

        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":description_en", $this->description_en);
        $stmt->bindParam(":description_ar", $this->description_ar);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":main_image_path", $this->main_image_path);
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
        $query = "SELECT id, title, description_en, description_ar, category, main_image_path, featured, created_at
                  FROM " . $this->table_name . "
                  WHERE featured = 1
                  ORDER BY created_at DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function getCategories() {
        $query = "SELECT DISTINCT category FROM " . $this->table_name . " WHERE category IS NOT NULL ORDER BY category";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function addDetailImage($image_path, $sort_order = 0) {
        $query = "INSERT INTO " . $this->images_table . " SET project_id=:project_id, image_path=:image_path, sort_order=:sort_order";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":project_id", $this->id);
        $stmt->bindParam(":image_path", $image_path);
        $stmt->bindParam(":sort_order", $sort_order);

        return $stmt->execute();
    }

    public function getDetailImages() {
        $query = "SELECT id, image_path, sort_order FROM " . $this->images_table . " WHERE project_id = ? ORDER BY sort_order";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();

        return $stmt;
    }

    public function deleteDetailImages() {
        $query = "DELETE FROM " . $this->images_table . " WHERE project_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);

        return $stmt->execute();
    }
}
?>