import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import * as bcrypt from 'bcrypt';

const app = new App();

const bike = new Bike('mountain bike', 'mountain', 123, 500, 100.5, 'desc', 5, [], 'bike1');
const user = new User('Maria', 'maria@mail.com', '1234');

app.registerUser(user);


const today = new Date();
const twoDaysFromToday = new Date();
twoDaysFromToday.setDate(twoDaysFromToday.getDate() + 2);

const rent1 = Rent.create([], bike, user, today, twoDaysFromToday);

const user2 = new User('Joao', 'joao@mail.com', '3123');
app.registerUser(user2);

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const sevenDaysFromToday = new Date();
sevenDaysFromToday.setDate(sevenDaysFromToday.getDate() + 7);

const bike2 = new Bike('city bike', 'urban', 110, 300, 50.0, 'desc2', 4, [], 'bike2');
app.registerBike(bike2);

const rent2 = Rent.create([], bike2, user2, tomorrow, sevenDaysFromToday);

const returnedDate1 = new Date();
returnedDate1.setDate(returnedDate1.getDate() + 1);
const returnedDate2 = new Date();
returnedDate2.setDate(returnedDate2.getDate() + 3);

app.returnBike(rent1, returnedDate1);
app.returnBike(rent2, returnedDate2);

console.log(rent1);
console.log(rent2);

// Listagem de usuários
console.log('Lista de Usuários:');
const allUsers = app.listUsers();
console.log(allUsers);

// Listagem de reservas/aluguéis
console.log('Lista de Reservas/Aluguéis:');
const allRents = app.listRents();
console.log(allRents);

// Listagem de bikes
console.log('Lista de Bicicletas:');
const allBikes = app.listBikes();
console.log(allBikes);

// Autenticação de usuário
const email = 'maria@mail.com';
const password = '1234';
const authenticatedUser = app.authenticateUser(email, password);

if (authenticatedUser) {
    console.log(`Usuário autenticado: ${authenticatedUser.name}`);
} else {
    console.log('Autenticação falhou. Verifique suas credenciais.');
}
