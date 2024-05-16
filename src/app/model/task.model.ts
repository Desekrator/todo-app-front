export class TaskModel {
    constructor(
        public id: string | number,
        public title: string,
        public description: string,
        public status: string,
        public priority: string
    ) { }
}



