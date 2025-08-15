"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var readlineSync = require("readline-sync");
var Customer = /** @class */ (function () {
    function Customer(id, name, email, phone) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
    Customer.prototype.getDetails = function () {
        return "ID: ".concat(this.id, ", Name: ").concat(this.name, ", Email: ").concat(this.email, ", Phone: ").concat(this.phone);
    };
    return Customer;
}());
var Vehicle = /** @class */ (function () {
    function Vehicle(id, type, rentalPricePerDay) {
        this.id = id;
        this.type = type;
        this.rentalPricePerDay = rentalPricePerDay;
        this.isAvailable = true;
    }
    Vehicle.prototype.rent = function () { this.isAvailable = false; };
    Vehicle.prototype.returnVehicle = function () { this.isAvailable = true; };
    return Vehicle;
}());
var Car = /** @class */ (function (_super) {
    __extends(Car, _super);
    function Car(id, rentalPricePerDay) {
        return _super.call(this, id, "Car", rentalPricePerDay) || this;
    }
    Car.prototype.calculateRentalCost = function (days) {
        return days * this.rentalPricePerDay;
    };
    Car.prototype.getFeatures = function () {
        return ["Dieu hoa", "GPS dan duong"];
    };
    Car.prototype.getInsurancePolicy = function () {
        return "Bao hiem toan dien, mien thuong $500";
    };
    return Car;
}(Vehicle));
var Motorcycle = /** @class */ (function (_super) {
    __extends(Motorcycle, _super);
    function Motorcycle(id, rentalPricePerDay) {
        return _super.call(this, id, "Motorcycle", rentalPricePerDay) || this;
    }
    Motorcycle.prototype.calculateRentalCost = function (days) {
        return days * this.rentalPricePerDay;
    };
    Motorcycle.prototype.getFeatures = function () {
        return ["Mu bao hiem di kem"];
    };
    Motorcycle.prototype.getInsurancePolicy = function () {
        return "Bao hiem trach nhiem nhan su co ban";
    };
    return Motorcycle;
}(Vehicle));
var Truck = /** @class */ (function (_super) {
    __extends(Truck, _super);
    function Truck(id, rentalPricePerDay) {
        return _super.call(this, id, "Truck", rentalPricePerDay) || this;
    }
    Truck.prototype.calculateRentalCost = function (days) {
        return days * this.rentalPricePerDay;
    };
    Truck.prototype.getFeatures = function () {
        return ["Thung hang lon", "Bung nang thuy luc"];
    };
    Truck.prototype.getInsurancePolicy = function () {
        return "Bao hiem hang hoa va phuing tien thuong mai";
    };
    return Truck;
}(Vehicle));
var Rental = /** @class */ (function () {
    function Rental(rentalId, customer, vehicle, days) {
        this.rentalId = rentalId;
        this.customer = customer;
        this.vehicle = vehicle;
        this.days = days;
        this.totalCost = vehicle.calculateRentalCost(days);
    }
    Rental.prototype.getDetails = function () {
        return "Rental ID: ".concat(this.rentalId, ", Customer: ").concat(this.customer.name, ", Vehicle: ").concat(this.vehicle.type, " (ID: ").concat(this.vehicle.id, "), Days: ").concat(this.days, ", Total: $").concat(this.totalCost);
    };
    return Rental;
}());
var RentalAgency = /** @class */ (function () {
    function RentalAgency() {
        this.vehicles = [];
        this.customers = [];
        this.rentals = [];
    }
    RentalAgency.prototype.addVehicle = function (vehicle) {
        this.vehicles.push(vehicle);
    };
    RentalAgency.prototype.addCustomer = function (name, email, phone) {
        var newCustomer = new Customer(this.customers.length + 1, name, email, phone);
        this.customers.push(newCustomer);
        return newCustomer;
    };
    RentalAgency.prototype.rentVehicle = function (customerId, vehicleId, days) {
        var customer = this.customers.find(function (c) { return c.id === customerId; });
        var vehicle = this.vehicles.find(function (v) { return v.id === vehicleId; });
        if (!customer) {
            console.log("khong tim thay khach hang");
            return null;
        }
        if (!vehicle) {
            console.log("khong tim thay phuong tien");
            return null;
        }
        if (!vehicle.isAvailable) {
            console.log("Xe dang duoc thue");
            return null;
        }
        vehicle.rent();
        var rental = new Rental(this.rentals.length + 1, customer, vehicle, days);
        this.rentals.push(rental);
        return rental;
    };
    RentalAgency.prototype.returnVehicle = function (vehicleId) {
        var vehicle = this.vehicles.find(function (v) { return v.id === vehicleId; });
        if (!vehicle) {
            console.log("Khong tim thay xe");
            return;
        }
        vehicle.returnVehicle();
        console.log("Xe ID ".concat(vehicleId, " da duoc tra lai."));
    };
    RentalAgency.prototype.listAvailableVehicles = function () {
        var available = this.vehicles.filter(function (v) { return v.isAvailable; });
        console.log("Xe con trong:");
        available.forEach(function (v) { return console.log("ID: ".concat(v.id, ", Type: ").concat(v.type, ", Price/day: $").concat(v.rentalPricePerDay)); });
    };
    RentalAgency.prototype.listCustomerRentals = function (customerId) {
        var rentals = this.rentals.filter(function (r) { return r.customer.id === customerId; });
        if (rentals.length === 0) {
            console.log("Khach hang chua co hop dong nao.");
            return;
        }
        rentals.forEach(function (r) { return console.log(r.getDetails()); });
    };
    RentalAgency.prototype.calculateTotalRevenue = function () {
        return this.rentals.reduce(function (total, r) { return total + r.totalCost; }, 0);
    };
    return RentalAgency;
}());
var agency = new RentalAgency();
function showMenu() {
    console.log("\n1.Th\u00EAm kh\u00E1ch h\u00E0ng m\u1EDBi.\n2.Th\u00EAm ph\u01B0\u01A1ng ti\u1EC7n m\u1EDBi (cho ch\u1ECDn lo\u1EA1i: Car, Motorcycle, Truck).\n3. Thu\u00EA xe (ch\u1ECDn kh\u00E1ch h\u00E0ng, ch\u1ECDn xe, nh\u1EADp s\u1ED1 ng\u00E0y).\n4. Tr\u1EA3 xe.\n5. Hi\u1EC3n th\u1ECB danh s\u00E1ch xe c\u00F2n tr\u1ED1ng (s\u1EED d\u1EE5ng filter).\n6. Hi\u1EC3n th\u1ECB danh s\u00E1ch h\u1EE3p \u0111\u1ED3ng c\u1EE7a m\u1ED9t kh\u00E1ch h\u00E0ng (s\u1EED d\u1EE5ng filter).\n7. T\u00EDnh v\u00E0 hi\u1EC3n th\u1ECB t\u1ED5ng doanh thu (s\u1EED d\u1EE5ng reduce). \n8. \u0110\u1EBFm s\u1ED1 l\u01B0\u1EE3ng t\u1EEBng lo\u1EA1i xe (s\u1EED d\u1EE5ng reduce ho\u1EB7c map).\n9. T\u00ECm ki\u1EBFm v\u00E0 hi\u1EC3n th\u1ECB th\u00F4ng tin b\u1EB1ng m\u00E3 \u0111\u1ECBnh danh (s\u1EED d\u1EE5ng h\u00E0m generic \u0111\u00E3 t\u1EA1o, cho ph\u00E9p ng\u01B0\u1EDDi d\u00F9ng ch\u1ECDn t\u00ECm ki\u1EBFm Customer ho\u1EB7c Vehicle). (10\u0111)\n10. Hi\u1EC3n th\u1ECB t\u00EDnh n\u0103ng v\u00E0 ch\u00EDnh s\u00E1ch b\u1EA3o hi\u1EC3m c\u1EE7a m\u1ED9t xe (s\u1EED d\u1EE5ng find).\n11. Tho\u00E1t ch\u01B0\u01A1ng tr\u00ECnh. \n    ");
    var choice = readlineSync.question("Chon: ");
    switch (choice) {
        case "1": {
            var name_1 = readlineSync.question("Ten khach: ");
            var email = readlineSync.question("Email: ");
            var phone = readlineSync.question("SDT: ");
            agency.addCustomer(name_1, email, phone);
            break;
        }
        case "2": {
            var type = readlineSync.question("Loai xe (1=Car, 2=Motorcycle, 3=Truck): ");
            var price = parseFloat(readlineSync.question("Gia thue 1 ngay: "));
            if (type === "1")
                agency.addVehicle(new Car(agency.vehicles.length + 1, price));
            else if (type === "2")
                agency.addVehicle(new Motorcycle(agency.vehicles.length + 1, price));
            else if (type === "3")
                agency.addVehicle(new Truck(agency.vehicles.length + 1, price));
            else
                console.log("Loai khong hop le.");
            break;
        }
        case "3": {
            var cid = parseInt(readlineSync.question("ID khach hang: "));
            var vid = parseInt(readlineSync.question("ID xe: "));
            var days = parseInt(readlineSync.question("So ngay thue: "));
            var rental = agency.rentVehicle(cid, vid, days);
            if (rental)
                console.log("Thue xe thanh cong:", rental.getDetails());
            break;
        }
        case "4": {
            var vid = parseInt(readlineSync.question("ID xe tra: "));
            agency.returnVehicle(vid);
            break;
        }
        case "5":
            agency.listAvailableVehicles();
            break;
        case "6": {
            var cid = parseInt(readlineSync.question("ID khach hang: "));
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
