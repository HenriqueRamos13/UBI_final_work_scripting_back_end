import { Request, Response } from "express-serve-static-core";
import { CourseMongo } from "../repositories/Course.repository";

class CourseService {
  public async create(req: Request, res: Response, next): Promise<any> {
    const { description, name } = req.body;

    const { _id: teacher } = req.user as any;

    CourseMongo.create({
      description,
      name,
      teacher,
    })
      .then((course) => {
        res.json({
          message: "Course created successfully",
          data: course,
        });
      })
      .catch((err) => {
        res.status(401).json({
          message: "Error creating course",
          error: err.message,
        });
      });
  }

  public async createTopic(req: Request, res: Response, next): Promise<any> {
    const { title, text } = req.body;

    const { id } = req.params;

    CourseMongo.createTopic({
      _id: id,
      title,
      text,
    })
      .then((course) => {
        res.json({
          message: "Topic created successfully",
          data: course,
        });
      })
      .catch((err) => {
        res.status(401).json({
          message: "Error creating topic",
          error: err.message,
        });
      });
  }

  public async findOne(req: Request, res: Response, next): Promise<any> {
    const { id } = req.params;

    CourseMongo.findOne({
      ...(id && { _id: id }),
    })
      .then((course) => {
        res.json({
          message: "Course found successfully",
          data: course,
        });
      })
      .catch((err) => {
        res.status(401).json({
          message: "Error finding course",
          error: err.message,
        });
      });
  }

  public async findAll(req: Request, res: Response, next): Promise<any> {
    const { user } = req;

    CourseMongo.findAll(user as any)
      .then((courses) => {
        res.json({
          message: "Courses found successfully",
          data: courses,
        });
      })
      .catch((err) => {
        res.status(401).json({
          message: "Error finding ucourse",
          error: err.message,
        });
      });
  }

  public async update(req: Request, res: Response, next): Promise<any> {
    const { name, description } = req.body;
    const { id } = req.params;

    CourseMongo.update({
      _id: id,
      ...(name && { name }),
      ...(description && { description }),
    })
      .then((course) => {
        res.json({
          message: "Course updated successfully",
          data: course,
        });
      })
      .catch((err) => {
        res.status(401).json({
          message: "Error updating course",
          error: err.message,
        });
      });
  }

  public async updateAdmin(req: Request, res: Response, next): Promise<any> {
    const { name, description } = req.body;
    const { id } = req.params;

    CourseMongo.update({
      _id: id,
      ...(name && { name }),
      ...(description && { description }),
    })
      .then((course) => {
        res.json({
          message: "Course updated successfully",
          data: course,
        });
      })
      .catch((err) => {
        res.status(401).json({
          message: "Error updating course",
          error: err.message,
        });
      });
  }

  public async delete(req: Request, res: Response, next): Promise<any> {
    const { id } = req.params;

    CourseMongo.delete(id)
      .then((course) => {
        res.json({
          message: "Course deleted successfully",
          data: course,
        });
      })
      .catch((err) => {
        res.status(401).json({
          message: "Error deleting course",
          error: err.message,
        });
      });
  }
}

export default new CourseService();
