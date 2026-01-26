interface User {
    username: string;
    password: string;
    name: string;
    country: string;
    city: string;
    creditCard: string;
    month: string;
    year: string
}


export class UserBuilder {
    public user: Partial<User> = {};

    constructor(username: string, password: string) {
        this.user.username = username;
        this.user.password = password;
    }

    setName(name: string) {
        this.user.name = name;
        return this;
    }
    
    setCountry(country: string) {
        this.user.country = country;
        return this;
    }

    setCity(city: string) {
        this.user.city = city;
        return this;
    }

    setCreditCard(creditCard: string) {
        this.user.creditCard = creditCard;
        return this;
    }

    setMonth(month: string) {
        this.user.month = month;
        return this;
    }

    setYear(year: string) {
        this.user.year = year;
        return this;
    }

    build(): User {
        if (!this.user.username || !this.user.password) {
            throw new Error("Username and password are required");
        }
        return {...this.user} as User;
    }
}
