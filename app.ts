import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from 'crypto'


export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    findUser(email: string): User | undefined {
        return this.users.find(user => user.email === email);
    }

    registerUser(user: User): void {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.');
            }
        }
        user.id = crypto.randomUUID();
        this.users.push(user);
    }

    registerBike(bike: Bike): void {
        this.bikes.push(bike);
    }

    removeUser(email: string): void {
        const index = this.users.findIndex(user => user.email === email);
        if (index !== -1) {
            this.users.splice(index, 1);
        }
    }

    rentBike(user: User, bike: Bike, startDate: Date, endDate: Date): void {
        const rent = Rent.create(this.rents, bike, user, startDate, endDate);
        this.rents.push(rent);
    }

    returnBike(rent: Rent, returnedDate: Date): void {
        if (!rent.dateReturned) {
            rent.dateReturned = returnedDate;
        }
    }

    listUsers(): User[] {
        return this.users;
    }

    listRents(): Rent[] {
        return this.rents;
    }

    listBikes(): Bike[] {
        return this.bikes;
    }

    authenticateUser(email: string, password: string): User | undefined {
        const user = this.findUser(email);
        if (user && user.verifyPassword(password)) {
            return user;
        }
        return undefined;
    }
}
