

# CabConnect
CabConnect is a **Cab Booking Management System** built using **Spring Boot**, **Spring Data JPA**, and **MySQL**.  
It allows users to book rides, manage drivers, and track rides in real-time.
This project demonstrates full-stack backend development with database integration and RESTful APIs.

<img width="1876" height="857" alt="image" src="https://github.com/user-attachments/assets/33e96a58-d2e6-4ccc-99c9-2963f921fdd9" />
<img width="1886" height="822" alt="image" src="https://github.com/user-attachments/assets/7f500256-bedd-4092-a7ca-12fc5697de6f" />
<img width="1245" height="731" alt="image" src="https://github.com/user-attachments/assets/3738a933-7537-4976-ae70-56b62aa06066" />
<img width="1357" height="526" alt="image" src="https://github.com/user-attachments/assets/222eda46-2eee-4108-8fa1-79a352ce5fd7" />


---

## Features

- User registration   
- Book a cab and manage bookings  
- Driver management and availability tracking  
- RESTful APIs to fetch cabs, drivers, and ride details  
- Integration with **MySQL** database for persistent storage  

---

## Technologies Used

- **Backend:** Spring Boot, Spring Data JPA, Hibernate ORM  
- **Database:** MySQL  
- **Build Tool:** Maven  
- **Java Version:** 21   

---

## Database Schema

**Tables:**

1. `User` – Stores user information.  
2. `Driver` – Stores driver details and availability.  
3. `Cab` – Cab information including type and registration number.  
4. `Booking` – Records each cab booking, with references to `User` and `Driver`.  

**Relationships:**  

- One `User` can have multiple `Bookings`.  
- One `Driver` can have multiple `Bookings`.  
- `Cab` is assigned to `Driver`.

---

## Setup and Installation

### Prerequisites

- Java JDK 21 installed  
- MySQL server running  
- Maven installed  

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/Sahil-Mohril/CabConnect.git
cd CabConnect
