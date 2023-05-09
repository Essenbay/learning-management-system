import {User} from "./model/User";
import {Roles} from "./model/Roles";
import {Course} from "./model/Course";

export const db = {
    users: [
        new User(1, "Admin", "admin@mail.ru", "1234", Roles.ADMIN),
        new User(2, "Teacher", "teacher@@mail.ru", "1234", Roles.TEACHER),
        new User(3, "Student", "student@@mail.ru", "1234", Roles.STUDENT),
    ],
    courses: [
        new Course(1, "C++", [], [], 2, [], true),
        new Course(2, "Python", [], [], 2, [], false)
    ],
}

