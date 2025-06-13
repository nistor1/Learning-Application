# 🎓 E-Learning Platform – PWEB 2025

**Proiect pentru cursul PWEB 2025**  
Aplicație Web de tip e-learning care oferă cursuri online pentru utilizatori autentificați (studenți și profesori), cu funcționalități moderne, o interfață accesibilă și integrare AI.

---

## ✅ Funcționalități generale

- Navigare prietenoasă, cu meniuri și sub-meniuri în funcție de rol
- Motor de căutare pentru cursuri (disponibil și pentru vizitatori)
- Paginile disponibile fără autentificare:
  - Acasă
  - Cursuri (cu filtre și oferte)
  - Contact

---

## 👩‍🏫 Funcționalități pentru profesori

- Gestionare cursuri: `adăugare`, `editare`, `ștergere`
- Vizualizare înrolări sub formă de **calendar**
- Statistici grafice: număr studenți înrolați / lună

---

## 🧑‍🎓 Funcționalități pentru studenți

- Înrolare la cursuri prin formular
- Afișare cursuri disponibile în funcție de intervalul ales și locuri disponibile
- Calcul automat al **costului total** înrolare
- Integrare cu **AI chatbot (ChatGPT)** pentru suport interactiv

---

## 🧠 Funcționalități inteligente

- 🧭 **Geolocalizare** utilizator + salvare în Cookies / Web Storage
- 🧠 **Chatbot AI** integrat cu OpenAI GPT pentru întrebări frecvente
- 📊 **Filtrare avansată** după dată și domenii de interes
- 🌐 Prioritizarea cursurilor oferite în limba utilizatorului

---

## 🏗️ Arhitectură tehnică

### 📦 Tehnologii folosite

| Componentă       | Tehnologie       |
|------------------|------------------|
| Frontend         | `React.js`       |
| Backend          | `Node.js` + `Express` |
| Bază de date     | `MongoDB`        |
| Stilizare        | `HTML5`, `CSS3`, `JavaScript`, `Tailwind` |
| Autentificare    | `Session-based login` |
| Grafică & UI     | `Figma` (pentru mockup-uri) |
| AI Chatbot       | `OpenAI API`     |

---

## 🗄️ Model de date (MongoDB)

- `User`: { id, nume, email, parolă, rol, limbă }
- `Course`: { titlu, descriere, domeniu, datăStart, datăFinal, limbiDisponibile, locuriDisponibile, cost }
- `Enrollment`: { studentId, courseId, datăInscriere, totalCost }
- `Offer`: { cursId, discount, datăExpirare }

---

## 🔌 API-uri backend – Exemple

```http
GET /api/courses
POST /api/courses (Profesor)
GET /api/courses/filter?start=2025-06-01&end=2025-06-30
POST /api/enrollments (Student)
GET /api/statistics/enrollments/monthly (Profesor)
POST /api/auth/register
POST /api/auth/login
