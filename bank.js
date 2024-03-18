class Customer {
  name = "";
  address = "";
  phone = "";
  email = "";
  accounts = [];
  constructor(name, address, phone, email) {
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.email = email;
  }
  verify(name, address, phone, email) {
    if (
      this.name === name &&
      this.address === address &&
      this.phone === phone &&
      this.email === email
    ) {
      return true;
    } else {
      return false;
    }
  }
  getAccount() {
    return this.accounts;
  }
  createAccount(bank, accountType) {
    return bank.createAccount(accountType);
  }
  toString() {
    return `Person : [Name = ${this.name}, Address = ${this.address}, Email = ${this.email}, Phone = ${this.phone}]`;
  }
}

class Account {
  accountNumber = "";
  balance = "";
  constructor(accountNumber, balance) {
    this.accountNumber = accountNumber;
    this.balance = balance;
  }
  deposit() {}
  withdraw() {}
  createTransaction() {}
  getTransaction() {}
  getBalance() {}
  getAccountType() {}
  getCustomer() {}
  setCustomer() {}
}

class Bank {
  name = "";
  address = "";
  code = "";
  constructor(name, address, code) {
    this.name = name;
    this.address = address;
    this.code = code;
  }
  createAccount(accountType) {
    let account;
    if (accountType === "CurrentAccount") {
      account = new CurrentAccount("654259", 10000, 2000, 0.1);
      return account;
    } else {
      account = new SavingsAccount("258759", 10000, 0.3);
      return account;
    }
  }
  createAtm(location, mangedBy) {
    const atm = new ATM("BanBank", "BankSE")
    return atm;
  }
  createCustomer(name, address, phone, email) {
    const customer = new Customer(
      "Sam",
      "Nakhon Pathom",
      "0255896375",
      "Sammii@gmail.com"
    );
    return customer;
  }
}

const main = () => {};
main();
