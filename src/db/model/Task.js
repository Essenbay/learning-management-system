export class Task {
    constructor(id, title, content, grade, isPermitted) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.grade = grade;
        this.isPermitted = isPermitted;
    }
}