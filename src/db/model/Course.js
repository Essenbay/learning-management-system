export class Course {
    constructor(id, title, lessons, studentsIds, teacherId, tasks, isPermitted) {
        this.id = id;
        this.title = title;
        this.lessons = lessons;
        this.studentsIds = studentsIds;
        this.teacherId = teacherId;
        this.tasks = tasks;
        this.isPermitted = isPermitted;
    }
}