class Customer {
  constructor(name, address, phone, email) {
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.accounts = [];
  }

  verify(name, address, phone, email) {
    return (
      this.name === name &&
      this.address === address &&
      this.phone === phone &&
      this.email === email
    );
  }

  getAccounts() {
    return this.accounts;
  }

  createAccount(bank, initialBalance) {
    let accountType;
    if (initialBalance >= 5000) {
        accountType = "ออมทรัพย์";
    } else {
        accountType = "กระแสรายวัน";
    }
    const account = bank.createAccount(accountType, initialBalance);
    this.accounts.push(account);
    return account;
}
}
class Account {
  constructor(accountNumber, balance) {
    this.accountNumber = accountNumber;
    this.balance = balance;
    this.transactions = []; // เพิ่ม transactions
  }

  deposit(amount) {
    console.log(`ฝากเงิน ${amount} เข้าไปที่บัญชี ${this.accountNumber}`);
    this.balance += amount;
  }

  withdraw(amount) {
    if (amount <= this.balance) {
      this.balance -= amount;
    } else {
      console.error("เงินไม่เพียงพอ");
    }
  }

  createTransaction(
    transactionId,
    transactionType,
    amount,
    transactionDate,
    status
  ) {
    console.log(`สร้างธุรกรรม ${transactionId} ประเภท ${transactionType}`);
    const transaction = new Transaction(
      transactionId,
      transactionType,
      amount,
      transactionDate,
      status
    );
    this.transactions.push(transaction);
  }

  getTransactions() {
    return this.transactions;
  }

  getBalance() {
    return this.balance;
  }
  getAccountType() {
    return this.accountType;
  }
  getCustomer() {
    return customer;
  }
  setCustomer() {
    this.customer = customer;
  }
  setAccountType(accountType) {
    this.accountType = accountType;
  }
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
  createAccount(accountType, initialBalance) {
    let account;
    if (accountType === "ออมทรัพย์") {
      account = new SavingAccount("258759", initialBalance, 0.3);
    } else if (accountType === "กระแสรายวัน") {
      account = new CurrentAccount("654259", initialBalance, 2000, 0.1);
    } else {
      console.error("ประเภทบัญชีไม่ถูกต้อง");
      return null;
    }
    account.setAccountType(accountType); // กำหนดประเภทบัญชี
    return account;
  }
  createAtm(location, mangedBy) {
    const atm = new ATM("Kampangsan", "Davika");
    return atm;
  }
  createCustomer(name, address, phone, email) {
    const customer = new Customer(
      "Samind",
      "Nakhon Pathom",
      "0255896375",
      "Sammii@gmail.com"
    );
    return customer;
  }
  createTransaction(
    transactionId,
    transactionType,
    amount,
    transactionDate,
    status
  ) {
    const transaction = new Transaction(
      transactionId,
      transactionType,
      amount,
      transactionDate,
      status
    );
    return transaction;
  }
  closeAccount(accountNumber, balance) {
    if (this.accountNumber === accountNumber && this.balance === balance) {
      return true;
    } else {
      return false;
    }
  }
  openAccount(accountNumber, balance) {
    if (this.accountNumber === accountNumber && this.balance === balance) {
      return true;
    } else {
      return false;
    }
  }
  verify(name, address, code) {
    if (this.name === name && this.address === address && this.code === code) {
      return true;
    } else {
      return false;
    }
  }
  maintain() {
    console.log("ดูแลระบบธนาคาร");
  }
  manage() {
    console.log("การจัดการของธนาคาร");
  }
}

class ATM {
  constructor(location, manageBy) {
    this.location = location;
    this.manageBy = manageBy;
  }

  identify() {
    console.log("กำลังระบุตัวตนผู้ใช้");
  }

  checkBalance(account) {
    console.log(`ตรวจสอบเงินคงเหลือ ${account.accountNumber}`);
    return account.getBalance();
  }

  withdraw(account, amount) {
    account.withdraw(amount); // เรียกใช้เมธอด withdraw ของ Account
    return amount; // คืนจำนวนเงินที่ถอน
  }

  deposit(account, amount) {
    console.log(`ฝากเงิน ${amount} ไปยังบัญชี ${account.accountNumber}`);
    account.deposit(amount);
  }

  changePin() {
    console.log("เปลี่ยนรหัส");
  }

  transfer() {
    console.log("");
  }

  verify() {
    console.log("");
  }
}

class Transaction {
  transactionId = "";
  transactionType = "";
  amount = 0;
  transactionDate = "";
  status = "";
  constructor(transactionId, transactionType, amount, transactionDate, status) {
    this.transactionId = transactionId;
    this.transactionType = transactionType;
    this.amount = amount;
    this.transactionDate = transactionDate;
    this.status = status;
  }
  getTransactionId() {
    return this.transactionId;
  }
  getTransactionType() {
    return this.transactionType;
  }
  getAmount() {
    return this.amount;
  }
  getTransactionDate() {
    return this.transactionDate;
  }
  getStatus() {
    return this.status;
  }
  setStatus(status) {
    this.status = status;
  }
  setTransactionType(transactionType) {
    this.transactionType = transactionType;
  }
  setAmount(amount) {
    this.amount = amount;
  }
  setTransactionDate(transactionDate) {
    this.transactionDate = transactionDate;
  }
}

class CurrentAccount extends Account {
  constructor(accountNumber, balance, overdraftLimit, overdraftInterest) {
    super(accountNumber, balance);
    this.overdraftLimit = overdraftLimit;
    this.overdraftInterest = overdraftInterest;
  }
  calculateInterest() {
    if (this.balance < 0) {
      const interest = Math.abs(this.balance) * this.overdraftInterest;
      console.log(`คำนวณดอกเบี้ยเงินที่เกิน: ${interest}`);
      return interest;
    } else {
      console.log(`ไม่มีดอกเบี้ยเนื่องจากยอดคงเหลือไม่ติดลบ`);
      return 0;
    }
  }
  getOverdraftLimit() {
    return this.overdraftLimit;
  }
  setOverdraftLimit(overdraftLimit) {
    this.overdraftLimit = overdraftLimit;
  }
}

class SavingAccount extends Account {
  constructor(accountNumber, balance, interestRate) {
    super(accountNumber, balance);
    this.interestRate = interestRate;
  }
  calculateInterest() {
    const interest = this.balance * this.interestRate;
    console.log(`คำนวณดอกเบี้ย: ${interest}`);
    return interest;
  }
  getInterestRate() {
    return this.interestRate;
  }
  setInterestRate(interestRate) {
    this.interestRate = interestRate;
  }
}

const main = () => {
  // ธนาคาร
  const bank = new Bank("SeNpru", "Npru", "12345");

  // สร้างลูกค้า
  const customer = bank.createCustomer();

  const account = customer.createAccount(bank, 5000);

  // เพิ่มบัญชีให้กับลูกค้า
  customer.createAccount(bank, "ออมทรัพย์", 500);
  

  // ถอนเงินที่ ATM
  const atm = bank.createAtm();

  console.log(
    `เลขบัญชีใหม่: ${account.accountNumber} ประเภทบัญชี:${account.getAccountType()}  ชื่อเจ้าของบัญชี: ${customer.name} ที่อยู่: ${customer.address} เบอร์โทร: ${customer.phone} อีเมล: ${customer.email}  สาขา: ${atm.location} จัดการโดย: ${atm.manageBy}`
  );
  console.log(`ยอดเงินคงเหลือ: ${account.getBalance()}`);

  // การฝากเงิน
  account.deposit(5550); // ต้องแก้ไข

  // แสดงยอดเงินคงเหลือ
  console.log(`ยอดเงินคงเหลือ: ${account.getBalance()}`);

  console.log(
    `ถอนเงินผ่าน ATM จากบัญชี: ${account.accountNumber} จำนวน: ${atm.withdraw(
      account,
      100
    )}`
  );
  console.log(`ยอดเงินคงเหลือ: ${account.getBalance()}`);
};
main();
