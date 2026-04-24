import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Order } from '../../models/order';

@Component({
  standalone: true,
  selector: 'app-order-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './order-list.html',
  styleUrls: ['./order-list.css'],
})
export class OrderListComponent {
  @Input() orders: Order[] | null = [];
  @Output() create = new EventEmitter<Order>();
  @Output() update = new EventEmitter<{order: Order, id: number}>();
  @Output() delete = new EventEmitter<number>();

  newOrder: Order = {
    id: 0,
    name: '',
    total: 0,
    statusId: 0
  };

  editing: boolean = false;
  editingId: number = 0;

  createOrder() {
    if (this.editing) {
      this.update.emit({ order: this.newOrder, id: this.editingId });
      this.cancelEdit();
    } else {
      this.create.emit(this.newOrder);
      this.newOrder = { id: 0, name: '', total: 0, statusId: 0 };
    }
  }

  editOrder(order: Order, id: number) {
    this.editing = true;
    this.editingId = id;
    this.newOrder = { ...order };
  }

  cancelEdit() {
    this.editing = false;
    this.editingId = 0;
    this.newOrder = { id: 0, name: '', total: 0, statusId: 0 };
  }

  deleteOrder(id: number) {
    if (confirm('Are you sure you want to delete this order?')) {
      this.delete.emit(id);
    }
  }
}
