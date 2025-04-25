import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule, NgClass, NgFor } from '@angular/common';

export interface ITodoItem{
    id: number,
    task: string,
    completed: boolean
}

  
@Component({
    selector: "app-root",
    standalone: true,
    imports: [FormsModule, CommonModule, NgFor, NgClass], // Добавили CommonModule
    templateUrl: './app.component.html', // Указали правильный путь к шаблону
    styleUrls: ['./app.component.scss'] // Опционально, если есть стили
})
export class AppComponent implements OnInit {
    
    todoList: ITodoItem[] = []
    newTask: string = ''
    
    private readonly STORAGE_KEY = 'angular_todo_list'

    ngOnInit(): void {
        this.loadTasks()
    }

    private loadTasks(): void {
        const savedTasks = localStorage.getItem(this.STORAGE_KEY)
        if(savedTasks) {
            this.todoList = JSON.parse(savedTasks)
        }
    }

    private saveTasks(): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.todoList))
    }

    addTask():void{
        if(this.newTask.trim() !== ''){
            const newTodoItem : ITodoItem = {
                id: Date.now(),
                task: this.newTask,
                completed: false
            }
            this.todoList.push(newTodoItem)
            this.newTask = ''
            this.saveTasks()
        }
    }

    toggleCompleted(index: number): void {
        this.todoList[index].completed = !this.todoList[index].completed
        this.saveTasks()
    }
    deleteTask(id: number) {
        this.todoList = this.todoList.filter(item => item.id !== id)
        this.saveTasks()
    }
 }