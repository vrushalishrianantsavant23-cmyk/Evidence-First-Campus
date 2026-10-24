# AI-use record (Task 2)

Five AI-assisted exercises, each checked by me. Model for all five: Claude Sonnet 5.5. Date for all five: 23 Oct 2026. The checking code was written with Claude's help; I ran it in Google Colab or SQLite Online and compared the results myself.

---

## Exercise 1: Computer Networks (subnetting)

**Prompt:** Split 192.168.10.0/24 into 6 subnets. Give the subnet mask, block size and usable host range of each subnet.

**Model and date:** Sonnet 5.5, 23 Oct 2026

**Claude's output:**

To get 6 subnets you need to borrow 3 bits from the host portion (2^2 = 4 is too few, 2^3 = 8 is enough).

- New prefix: /24 + 3 = /27
- Subnet mask: 255.255.255.224
- Block size: 256 - 224 = 32 addresses per subnet
- Usable hosts per subnet: 32 - 2 = 30
- Subnets created: 8 (you use 6 and leave 2 spare)

| # | Network address | Usable host range | Broadcast address |
|---|-----------------|-------------------|-------------------|
| 1 | 192.168.10.0/27 | 192.168.10.1 - 192.168.10.30 | 192.168.10.31 |
| 2 | 192.168.10.32/27 | 192.168.10.33 - 192.168.10.62 | 192.168.10.63 |
| 3 | 192.168.10.64/27 | 192.168.10.65 - 192.168.10.94 | 192.168.10.95 |
| 4 | 192.168.10.96/27 | 192.168.10.97 - 192.168.10.126 | 192.168.10.127 |
| 5 | 192.168.10.128/27 | 192.168.10.129 - 192.168.10.158 | 192.168.10.159 |
| 6 | 192.168.10.160/27 | 192.168.10.161 - 192.168.10.190 | 192.168.10.191 |

The two unused subnets are available for future growth:

| # | Network address | Usable host range | Broadcast address |
|---|-----------------|-------------------|-------------------|
| 7 | 192.168.10.192/27 | 192.168.10.193 - 192.168.10.222 | 192.168.10.223 |
| 8 | 192.168.10.224/27 | 192.168.10.225 - 192.168.10.254 | 192.168.10.255 |

All subnets share the mask 255.255.255.224, and each network address is a multiple of the block size (0, 32, 64, 96, 128, 160, ...). The first usable host is the network address + 1, and the last is the broadcast address - 1.

**How I verified:** I ran Python's `ipaddress` module in Google Colab and compared the mask, first host and last host of all 8 subnets line by line. I checked by hand that /27 is right (2^2 = 4 < 6, 2^3 = 8 >= 6).

**Checking code:**

```python
import ipaddress
net = ipaddress.ip_network("192.168.10.0/24")
for s in net.subnets(new_prefix=27):
    hosts = list(s.hosts())
    print(s, "mask", s.netmask, "first", hosts[0], "last", hosts[-1])
```

**Output from Colab:**

```text
192.168.10.0/27 mask 255.255.255.224 first 192.168.10.1 last 192.168.10.30
192.168.10.32/27 mask 255.255.255.224 first 192.168.10.33 last 192.168.10.62
192.168.10.64/27 mask 255.255.255.224 first 192.168.10.65 last 192.168.10.94
192.168.10.96/27 mask 255.255.255.224 first 192.168.10.97 last 192.168.10.126
192.168.10.128/27 mask 255.255.255.224 first 192.168.10.129 last 192.168.10.158
192.168.10.160/27 mask 255.255.255.224 first 192.168.10.161 last 192.168.10.190
192.168.10.192/27 mask 255.255.255.224 first 192.168.10.193 last 192.168.10.222
192.168.10.224/27 mask 255.255.255.224 first 192.168.10.225 last 192.168.10.254
```

**Verdict:** Correct, no changes needed.

**Limitation:** The checking code was written with Claude's help, and it assumes /27 from the start. So Python checked the subnet ranges, and I checked the choice of /27 by hand: 2^2 = 4 is less than 6 subnets, and 2^3 = 8 is enough, so 3 bits are borrowed. I tested one example only.

---

## Exercise 2: DBMS (normalization to 3NF)

**Prompt:** Normalize Orders(order_id, customer_id, customer_name, customer_city, product_id, product_name, unit_price, quantity) to 3NF. FDs: order_id->customer_id; customer_id->customer_name, customer_city; product_id->product_name, unit_price; (order_id, product_id)->quantity. Give the tables and SQLite CREATE statements.

**Model and date:** Sonnet 5.5, 23 Oct 2026

**Claude's output:**

Candidate key: {order_id, product_id}. This determines everything: order_id gives customer_id, then customer name and city; product_id gives name and price; the pair gives quantity.

Why it is not in 3NF:
- 2NF violations (partial dependencies): customer_id, customer_name and customer_city depend only on order_id, and product_name and unit_price depend only on product_id, each a proper subset of the key.
- 3NF violation (transitive dependency): order_id -> customer_id -> customer_name, customer_city.

Decomposition (3NF, and also BCNF):
- Customers(customer_id, customer_name, customer_city)
- Products(product_id, product_name, unit_price)
- Orders(order_id, customer_id), with customer_id as FK to Customers
- OrderItems(order_id, product_id, quantity), with order_id as FK to Orders and product_id as FK to Products

Every FD is preserved in exactly one table, and the decomposition is lossless.

```sql
PRAGMA foreign_keys = ON;

CREATE TABLE Customers (
    customer_id   INTEGER PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_city TEXT
);

CREATE TABLE Products (
    product_id   INTEGER PRIMARY KEY,
    product_name TEXT NOT NULL,
    unit_price   NUMERIC NOT NULL CHECK (unit_price >= 0)
);

CREATE TABLE Orders (
    order_id    INTEGER PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

CREATE TABLE OrderItems (
    order_id   INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity   INTEGER NOT NULL CHECK (quantity > 0),
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id)   REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);
```

Note: SQLite only enforces foreign keys when `PRAGMA foreign_keys = ON` is set, and it must be set on each connection.

Design caveat from Claude: since unit_price lives in Products, changing a product's price alters the apparent price on historical orders. That is correct for the given FDs, but in a real system you would often add a unit_price column to OrderItems to record the price at the time of sale (a new FD, (order_id, product_id) -> unit_price).

**How I verified:** I ran the CREATE statements in sqliteonline.com (SQLite) and listed the tables with `SELECT name FROM sqlite_master`. Four tables were created: Customers, Products, Orders, OrderItems. I checked each FD by hand against the tables (customer_name and customer_city in Customers, product_name and unit_price in Products, quantity in OrderItems with key (order_id, product_id)).

**Verdict:** Correct.

**Limitations:** The first run failed with "table Customers already exists" because I ran the script twice; I added DROP TABLE IF EXISTS lines and re-ran it. That was my mistake, not the SQL's. I did not insert test data or test the foreign keys.

---
