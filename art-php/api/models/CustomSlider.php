<?php
class CustomSlider {
    private $conn;
    private $table_name = "custom_sliders";

    public $id;
    public $title;
    public $description;
    public $project_ids;
    public $order_position;
    public $is_active;
    public $created_at;
    public $updated_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function read() {
        $query = "SELECT id, title, description, project_ids, order_position, is_active, created_at, updated_at
                  FROM " . $this->table_name . "
                  ORDER BY order_position ASC, created_at DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function readActive() {
        $query = "SELECT id, title, description, project_ids, order_position, is_active, created_at, updated_at
                  FROM " . $this->table_name . "
                  WHERE is_active = 1
                  ORDER BY order_position ASC, created_at DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function readOne() {
        $query = "SELECT id, title, description, project_ids, order_position, is_active, created_at, updated_at
                  FROM " . $this->table_name . "
                  WHERE id = ? LIMIT 1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $this->title = $row['title'];
            $this->description = $row['description'];
            $this->project_ids = $row['project_ids'];
            $this->order_position = $row['order_position'];
            $this->is_active = $row['is_active'];
            $this->created_at = $row['created_at'];
            $this->updated_at = $row['updated_at'];

            return true;
        }

        return false;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . "
                  SET title=:title, description=:description, project_ids=:project_ids,
                      order_position=:order_position, is_active=:is_active";

        $stmt = $this->conn->prepare($query);

        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->is_active = $this->is_active ? 1 : 0;

        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":project_ids", $this->project_ids);
        $stmt->bindParam(":order_position", $this->order_position);
        $stmt->bindParam(":is_active", $this->is_active);

        if ($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }

        return false;
    }

    public function update() {
        $query = "UPDATE " . $this->table_name . "
                  SET title=:title, description=:description, project_ids=:project_ids,
                      order_position=:order_position, is_active=:is_active
                  WHERE id=:id";

        $stmt = $this->conn->prepare($query);

        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->is_active = $this->is_active ? 1 : 0;

        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":project_ids", $this->project_ids);
        $stmt->bindParam(":order_position", $this->order_position);
        $stmt->bindParam(":is_active", $this->is_active);
        $stmt->bindParam(":id", $this->id);

        return $stmt->execute();
    }

    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);

        return $stmt->execute();
    }

    public function getProjectsData() {
        if (!$this->project_ids) {
            return [];
        }

        $project_ids_array = json_decode($this->project_ids, true);
        if (!$project_ids_array || !is_array($project_ids_array)) {
            return [];
        }

        $placeholders = str_repeat('?,', count($project_ids_array) - 1) . '?';
        $query = "SELECT id, title, category, main_image_path FROM projects WHERE id IN ($placeholders)";

        $stmt = $this->conn->prepare($query);
        $stmt->execute($project_ids_array);

        $projects = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $projects[] = $row;
        }

        return $projects;
    }
}
?>