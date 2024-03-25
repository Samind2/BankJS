class Customer {
  constructor(name, address, phone, email) {
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.accounts = [];
  }

  // ตรวจสอบข้อมูลลูกค้า
  verify(name, address, phone, email) {
    return (
      this.name === name &&
      this.address === address &&
      this.phone === phone &&
      this.email === email
    );
  }

  // ดึงรายการบัญชี
  getAccounts() {
    return this.accounts;
  }

  // สร้างบัญชีใหม่
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
  //ฝากเงิน
  deposit(amount) {
    console.log(`ฝากเงิน ${amount} เข้าไปที่บัญชี ${this.accountNumber}`);
    this.balance += amount;
  }
  // ถอนเงิน
  withdraw(amount) {
    if (amount <= this.balance) {
      this.balance -= amount;
    } else {
      console.error("เงินไม่เพียงพอ");
    }
  }
  //สร้างธุรกรรม
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
  //ดึงรายการธุรกรรม
  getTransactions() {
    return this.transactions;
  }
  //ตรวจสอบยอดเงินคงเหลือ
  getBalance() {
    return this.balance;
  }
  //ตรวจสอบประเภทบัญชี
  getAccountType() {
    return this.accountType;
  }
  //ดึงข้อมูลลูกค้า
  getCustomer() {
    return customer;
  }
  //ตั้งค่าข้อมูลลูกค้า
  setCustomer() {
    this.customer = customer;
  }
  // ตั้งค่าประเภทบัญชี
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
    this.accounts = [];
  }
  //สร้างบัญชีใหม่
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
    this.accounts.push(account); // เพิ่มบัญชีในรายการบัญชีของธนาคาร
    return account;
  }
  //สร้างตู้ ATM
  createAtm(location, mangedBy) {
    const atm = new ATM("Kampangsan", "Davika");
    return atm;
  }
  //สร้างลูกค้า
  createCustomer(name, address, phone, email) {
    const customer = new Customer(
      "Samind",
      "Nakhon Pathom",
      "0255896375",
      "Sammii@gmail.com"
    );
    return customer;
  }
  //สร้างธุรกรรม
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
  openAccount(){
    return Account.openAccount(this.createAccount());
  }
  //ปิดบัญชี
  closeAccount(accountNumber, balance) {
    const accountIndex = this.accounts.findIndex(
      (acc) => acc.accountNumber === accountNumber
    );
    if (
      accountIndex !== -1 && balance === 0
    ) {
      this.accounts.splice(accountIndex, 1);
      return true;
    } else {
      return false;
    }
  }
  // ตรวจสอบข้อมูลธนาคาร
  verify(name, address, code) {
    if (this.name === name && this.address === address && this.code === code) {
      return true;
    } else {
      return false;
    }
  }
  //ดูแลระบบธนาคาร
  maintain() {
    console.log("ดูแลระบบธนาคาร");
  }
  //จัดการธนาคาร
  manage() {
    console.log("การจัดการของธนาคาร");
  }
}

class ATM {
  constructor(location, manageBy) {
    this.location = location;
    this.manageBy = manageBy;
  }
  // ระบุตัวตนผู้ใช้
  identify() {
    console.log("กำลังระบุตัวตนผู้ใช้");
  }
  //ตรวจสอบยอดเงินคงเหลือ
  checkBalance(account) {
    console.log(`ตรวจสอบเงินคงเหลือ ${account.accountNumber}`);
    return account.getBalance();
  }
  // ถอนเงิน
  withdraw(account, amount) {
    account.withdraw(amount); // เรียกใช้เมธอด withdraw ของ Account
    return amount; // คืนจำนวนเงินที่ถอน
  }
  //ฝากเงิน
  deposit(account, amount) {
    console.log(`ฝากเงิน ${amount} ไปยังบัญชี ${account.accountNumber}`);
    account.deposit(amount);
  }
  // เปลี่ยนรหัส PIN
  changePin() {
    console.log("เปลี่ยนรหัส");
  }
  //โอนเงิน
  transfer() {
    console.log("");
  }
  // ตรวจสอบข้อมูล
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
  // ดึงประเภทธุรกรรม
  getTransactionId() {
    return this.transactionId;
  }
  // ดึงประเภทธุรกรรม
  getTransactionType() {
    return this.transactionType;
  }
  //ดึงจำนวนเงิน
  getAmount() {
    return this.amount;
  }
  //ดึงวันที่ธุรกรรม
  getTransactionDate() {
    return this.transactionDate;
  }
  // ดึงสถานะธุรกรรม
  getStatus() {
    return this.status;
  }
  // ตั้งค่าสถานะธุรกรรม
  setStatus(status) {
    this.status = status;
  }
  //ตั้งค่าประเภทธุรกรรม
  setTransactionType(transactionType) {
    this.transactionType = transactionType;
  }
  //ตั้งค่าจำนวนเงิน
  setAmount(amount) {
    this.amount = amount;
  }
  //ตั้งค่าวันที่ธุรกรรม
  setTransactionDate(transactionDate) {
    this.transactionDate = transactionDate;
  }
//ตรวจสอบสถานะ
  checkStatus() {
    return this.status;
  }
}

//บัญชีกระแสรายวัน
class CurrentAccount extends Account {
  constructor(accountNumber, balance, overdraftLimit, overdraftInterest) {
    super(accountNumber, balance);
    this.overdraftLimit = overdraftLimit;
    this.overdraftInterest = overdraftInterest;
  }
  //คำนวณดอกเบี้ยเงินที่เกินบัญชี
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
  //ดึงวงเงินเบิกเกินบัญชี
  getOverdraftLimit() {
    return this.overdraftLimit;
  }
  //ตั้งค่าวงเงินเบิกเกินบัญชี
  setOverdraftLimit(overdraftLimit) {
    this.overdraftLimit = overdraftLimit;
  }
}

//บัญชีออมทรัพย์
class SavingAccount extends Account {
  constructor(accountNumber, balance, interestRate) {
    super(accountNumber, balance);
    this.interestRate = interestRate;
  }
  //คำนวณดอกเบี้ย
  calculateInterest() {
    const interest = this.balance * this.interestRate;
    console.log(`คำนวณดอกเบี้ย: ${interest}`);
    return interest;
  }
  //ดึงอัตราดอกเบี้ย
  getInterestRate() {
    return this.interestRate;
  }
  //ตั้งค่าอัตราดอกเบี้ย
  setInterestRate(interestRate) {
    this.interestRate = interestRate;
  }
}

const main = () => {
  // ธนาคาร
  const bank = new Bank();

  // สร้างลูกค้า
  const customer = bank.createCustomer();

  // สร้างบัชชีลูกค้า
  const account = customer.createAccount(bank, 200);

  // ถอนเงินที่ ATM
  const atm = bank.createAtm();

  console.log(
    `เลขบัญชีใหม่: ${
      account.accountNumber
    } ประเภทบัญชี:${account.getAccountType()}  ชื่อเจ้าของบัญชี: ${
      customer.name
    } ที่อยู่: ${customer.address} เบอร์โทร: ${customer.phone} อีเมล: ${
      customer.email
    }  สาขา: ${atm.location} จัดการโดย: ${atm.manageBy}`
  );
  console.log(`ยอดเงินคงเหลือ: ${account.getBalance()}`);

  // การฝากเงิน
  account.deposit(5550); // ต้องแก้ไข

  // แสดงยอดเงินคงเหลือ
  console.log(`ยอดเงินคงเหลือ: ${account.getBalance()}`);

  console.log(
    `ถอนเงินผ่าน ATM จากบัญชี: ${account.accountNumber} จำนวน: ${atm.withdraw(
      account,
      550
    )}`
  );
  console.log(`ยอดเงินคงเหลือ: ${account.getBalance()}`);

  //เช็คสถานะ
  //ในการเรียกใช้เมธอด checkStatus() ในคลาส Transaction จากอ็อบเจกต์ transaction ภายในฟังก์ชัน main() ของคุณ 
  //เราต้องเรียกใช้งาน createTransaction() จากอ็อบเจกต์ของธนาคาร (bank) และไม่จำเป็นต้องส่งพารามิเตอร์ customer เข้าไป เนื่องจากฟังก์ชัน createTransaction() 
  //ไม่ต้องการพารามิเตอร์นี้ ดังนั้นเราจะต้องแก้ไขการเรียกใช้งานฟังก์ชัน createTransaction() ในฟังก์ชัน 
  const transaction = bank.createTransaction("258759", "ฝากเงิน", 1000, "25/3/2567", "เสร็จสิ้น");
  console.log(`สถานะของธุรกรรม: ${transaction.checkStatus()} `);

  //ปิดบัญชี
const closed = bank.closeAccount(account.accountNumber, account.getBalance());
if (closed) {
  console.log(`บัญชีเลขที่ ${account.accountNumber} ถูกปิดเรียบร้อยแล้ว`);
} else {
  console.log(`ไม่สามารถปิดบัญชีเลขที่ ${account.accountNumber} ได้`);
}
};
main();
