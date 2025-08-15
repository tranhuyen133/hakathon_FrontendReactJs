import * as readlineSync from "readline-sync";

class Customer {
    id: number;
    name: string;
    email: string;
    phone: string;

    constructor(id: number, name: string, email: string, phone: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    getDetails(): string {
        return `ID: ${this.id}, Name: ${this.name}, Email: ${this.email}, Phone: ${this.phone}`;
    }
}

abstract class Vehicle {
    id: number;
    type: string;
    rentalPricePerDay: number;
    isAvailable: boolean;

    constructor(id: number, type: string, rentalPricePerDay: number) {
        this.id = id;
        this.type = type;
        this.rentalPricePerDay = rentalPricePerDay;
        this.isAvailable = true;
    }

    rent(): void { this.isAvailable = false; }
    returnVehicle(): void { this.isAvailable = true; }

    abstract calculateRentalCost(days: number): number;
    abstract getFeatures(): string[];
    abstract getInsurancePolicy(): string;
}

class Car extends Vehicle {
    constructor(id: number, rentalPricePerDay: number) { 
        super(id, "Car", rentalPricePerDay); 
    }
    calculateRentalCost(days: number): number { 
        return days * this.rentalPricePerDay; 
    }
    getFeatures(): string[] { 
        return ["Dieu hoa", "GPS dan duong"]; 
    }
    getInsurancePolicy(): string { 
        return "Bao hiem toan dien, mien thuong $500"; 
    }
}

class Motorcycle extends Vehicle {
    constructor(id: number, rentalPricePerDay: number) { 
        super(id, "Motorcycle", rentalPricePerDay); 
    }
    calculateRentalCost(days: number): number { 
        return days * this.rentalPricePerDay; 
    }
    getFeatures(): string[] { 
        return ["Mu bao hiem di kem"];
     
    }
    getInsurancePolicy(): string {
        return "Bao hiem trach nhiem nhan su co ban"; 
    }
}

class Truck extends Vehicle {
    constructor(id: number, rentalPricePerDay: number) { 
        super(id, "Truck", rentalPricePerDay); 
    }
    calculateRentalCost(days: number): number { 
        return days * this.rentalPricePerDay; 
    }
    getFeatures(): string[] { 
        return ["Thung hang lon", "Bung nang thuy luc"]; 
    }
    getInsurancePolicy(): string { 
        return "Bao hiem hang hoa va phuing tien thuong mai"; 
    }
}

class Rental {
    rentalId: number;
    customer: Customer;
    vehicle: Vehicle;
    days: number;
    totalCost: number;

    constructor(rentalId: number, customer: Customer, vehicle: Vehicle, days: number) {
        this.rentalId = rentalId;
        this.customer = customer;
        this.vehicle = vehicle;
        this.days = days;
        this.totalCost = vehicle.calculateRentalCost(days);
    }

    getDetails(): string {
        return `Rental ID: ${this.rentalId}, Customer: ${this.customer.name}, Vehicle: ${this.vehicle.type} (ID: ${this.vehicle.id}), Days: ${this.days}, Total: $${this.totalCost}`;
    }
}

class RentalAgency {
    vehicles: Vehicle[] = [];
    customers: Customer[] = [];
    rentals: Rental[] = [];

    addVehicle(vehicle: Vehicle): void { 
        this.vehicles.push(vehicle); 
    }
    addCustomer(name: string, email: string, phone: string): Customer {
        const newCustomer = new Customer(this.customers.length + 1, name, email, phone);
        this.customers.push(newCustomer);
        return newCustomer;
    }

    rentVehicle(customerId: number, vehicleId: number, days: number): Rental | null {
        const customer = this.customers.find(c => c.id === customerId);
        const vehicle = this.vehicles.find(v => v.id === vehicleId);

        if (!customer) { 
            console.log("khong tim thay khach hang"); 
            return null; 
        }
        if (!vehicle) { 
            console.log("khong tim thay phuong tien"); 
            return null; 
        }
        if (!vehicle.isAvailable) { 
            console.log("Xe dang duoc thue")
            return null; 
        }

        vehicle.rent();
        const rental = new Rental(this.rentals.length + 1, customer, vehicle, days);
        this.rentals.push(rental);
        return rental;
    }

    returnVehicle(vehicleId: number): void {
        const vehicle = this.vehicles.find(v => v.id === vehicleId);
        if (!vehicle) { 
            console.log("Khong tim thay xe"); 
            return; 
        }
        vehicle.returnVehicle();
        console.log(`Xe ID ${vehicleId} da duoc tra lai.`);
    }

    listAvailableVehicles(): void {
        const available = this.vehicles.filter(v => v.isAvailable);
        console.log("Xe con trong:");
        available.forEach(v => console.log(`ID: ${v.id}, Type: ${v.type}, Price/day: $${v.rentalPricePerDay}`));
    }

    listCustomerRentals(customerId: number): void {
        const rentals = this.rentals.filter(r => r.customer.id === customerId);
        if (rentals.length === 0) { 
            console.log("Khach hang chua co hop dong nao."); 
            return; 
        }
        rentals.forEach(r => console.log(r.getDetails()));
    }

    calculateTotalRevenue(): number {
        return this.rentals.reduce((total, r) => total + r.totalCost, 0);
    }
}

const agency = new RentalAgency();

function showMenu() {
    console.log(`
1.Thêm khách hàng mới.
2.Thêm phương tiện mới (cho chọn loại: Car, Motorcycle, Truck).
3. Thuê xe (chọn khách hàng, chọn xe, nhập số ngày).
4. Trả xe.
5. Hiển thị danh sách xe còn trống (sử dụng filter).
6. Hiển thị danh sách hợp đồng của một khách hàng (sử dụng filter).
7. Tính và hiển thị tổng doanh thu (sử dụng reduce). 
8. Đếm số lượng từng loại xe (sử dụng reduce hoặc map).
9. Tìm kiếm và hiển thị thông tin bằng mã định danh (sử dụng hàm generic đã tạo, cho phép người dùng chọn tìm kiếm Customer hoặc Vehicle). (10đ)
10. Hiển thị tính năng và chính sách bảo hiểm của một xe (sử dụng find).
11. Thoát chương trình. 
    `);

    const choice = readlineSync.question("Chon: ");
    switch (choice) {
        case "1": {
            const name = readlineSync.question("Ten khach: ");
            const email = readlineSync.question("Email: ");
            const phone = readlineSync.question("SDT: ");
            agency.addCustomer(name, email, phone);
            break;
        }
        case "2": {
            const type = readlineSync.question("Loai xe (1=Car, 2=Motorcycle, 3=Truck): ");
            const price = parseFloat(readlineSync.question("Gia thue 1 ngay: "));
            if (type === "1") agency.addVehicle(new Car(agency.vehicles.length + 1, price));
            else if (type === "2") agency.addVehicle(new Motorcycle(agency.vehicles.length + 1, price));
            else if (type === "3") agency.addVehicle(new Truck(agency.vehicles.length + 1, price));
            else console.log("Loai khong hop le.");
            break;
        }
        case "3": {
            const cid = parseInt(readlineSync.question("ID khach hang: "));
            const vid = parseInt(readlineSync.question("ID xe: "));
            const days = parseInt(readlineSync.question("So ngay thue: "));
            const rental = agency.rentVehicle(cid, vid, days);
            if (rental) console.log("Thue xe thanh cong:", rental.getDetails());
            break;
        }
        case "4": {
            const vid = parseInt(readlineSync.question("ID xe tra: "));
            agency.returnVehicle(vid);
            break;
        }
        case "5":
            agency.listAvailableVehicles();
            break;
        case "6": {
            const cid = parseInt(readlineSync.question("ID khach hang: "));
            agency.listCustomerRentals(cid);
            break;
        }
        case "7":
            console.log("Tong doanh thu:", agency.calculateTotalRevenue());
            break;
        case "8":
            break;
        case "9":
            break;
        case "10":
            break;
        case "11": 
         console.log("Thoát chương trình.");
            process.exit(0);
        default:
            console.log("Lựa chọn không hợp lệ.");
    }

    showMenu();
}

showMenu();
