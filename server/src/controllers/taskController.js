import pool from "../config/db.js";

export const createTask = async (req, res) => {
  const { title, description, status, priority, deadline, project_id } =
    req.body;
  try {
    if (!title || !project_id) {
      return res
        .status(400)
        .json({ message: "Title and project_id are required" });
    }
    const project = await pool.query(
      "select id from projects where id = $1 and owner_id = $2",
      [project_id, req.user.id],
    );
    if (project.rows.length === 0) {
      return res.status(403).json({ message: "Not authorized" });
    }
    const task = await pool.query(
      `insert into tasks (title, description, status, priority, deadline, project_id, assigned_to) values ($1, $2, $3, $4, $5, $6, $7) returning * `,
      [
        title,
        description,
        status || "todo",
        priority || "medium",
        deadline,
        project_id,
        req.user.id,
      ],
    );
    res.status(201).json(task.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getTasks = async (req, res) => {
  try {
    if (!req.params.projectId) {
        return res.status(400).json({ message: "Project ID is required" });
    }
    const tasks = await pool.query(
      "select t.*,p.name as project_name from tasks t join projects p on t.project_id = p.id  where p.id = $1 and p.owner_id = $2",
      [req.params.projectId, req.user.id],
    );
    res.status(200).json(tasks.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyTasks = async (req, res) => {
  try {
    const tasks = await pool.query(
      "select t.*, p.name as project_name from tasks t join projects p on t.project_id = p.id  where t.assigned_to = $1",
      [req.user.id],
    );
    res.status(200).json(tasks.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTask = async (req, res) => {
  const { title, description, status, priority, deadline } = req.body;
  const { id } = req.params;
  try {
    const task = await pool.query(
      "select t.* from tasks t join projects p on t.project_id = p.id where   t.id = $1 and (p.owner_id = $2 OR t.assigned_to = $2)",
      [id, req.user.id],
    );
    if (task.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Task not found or not authorized" });
    }
    const existingTask = task.rows[0];
    const updatedTask = await pool.query(
      "update tasks set title = $1, description = $2, status = $3, priority = $4, deadline = $5 where id = $6 returning *",
      [
        title || existingTask.title,
        description || existingTask.description,
        status || existingTask.status,
        priority || existingTask.priority,
        deadline || existingTask.deadline,
        id,
      ],
    );
    res.status(200).json(updatedTask.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await pool.query(
      `select t.* from tasks t join projects p on t.project_id = p.id where t.id = $1 and p.owner_id = $2`,
      [id, req.user.id],
    );
    if (task.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Task not found or not authorized" });
    }
    await pool.query(`delete from tasks where id = $1`, [id]);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
