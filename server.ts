import express from "express";
import path from "path";
import fs from "fs";
import os from "os";
import { createServer as createViteServer } from "vite";
import { Notice, EventItem, AdmissionApplication, DownloadItem, Message, DashboardStats } from "./src/types";

const app = express();
const PORT = 3000;

app.use(express.json());

// Write database to the OS temp directory to avoid triggering file-system reload watchers on every edit
const DATA_FILE = path.join(os.tmpdir(), "nnic-data.json");

// Default seed data representing Nagar Nigam Inter College
const defaultData = {
  stats: {
    visitorCount: 1423,
    totalAdmissions: 42,
    activeNotices: 5,
    totalStudents: 1250
  },
  notices: [
    {
      id: "n1",
      title: "Admissions Open for Academic Session 2026-27",
      content: "Online registration for Classes VI to XII has started. Eligible candidates can submit their forms online. Entrance exams will be held in July.",
      date: "2026-06-25",
      category: "Admission",
      isUrgent: true,
      author: "Principal Desk"
    },
    {
      id: "n2",
      title: "Scholarship Scheme Notice for UP Board Students",
      content: "Applications are invited for the Post-Matric Scholarship Scheme. Students with >75% attendance and meeting income criteria can submit documents before July 15.",
      date: "2026-06-24",
      category: "Academic",
      isUrgent: true,
      author: "Office Registry"
    },
    {
      id: "n3",
      title: "Annual Sports Meet 2026 Schedule",
      content: "The Annual Sports Meet is scheduled to be held from November 10th to November 14th. Registrations for athletic events open on October 1st.",
      date: "2026-06-20",
      category: "Event",
      isUrgent: false,
      author: "Sports Dept"
    },
    {
      id: "n4",
      title: "Quarterly Examination Syllabus Published",
      content: "Syllabus for the first quarterly examinations (Classes VI-XII) has been updated in the downloads section. Please download your respective class files.",
      date: "2026-06-18",
      category: "Academic",
      isUrgent: false,
      author: "Academic Coordinator"
    },
    {
      id: "n5",
      title: "UP Board High School and Intermediate Toppers Felicitated",
      content: "Congratulations to our students who scored outstanding percentages in the recent Board Examinations. Best wishes for their future endeavors.",
      date: "2026-06-15",
      category: "General",
      isUrgent: false,
      author: "Principal Desk"
    }
  ],
  events: [
    {
      id: "e1",
      title: "Annual Science Exhibition",
      description: "Inter-school science model competition showcasing innovative student projects.",
      date: "2026-07-20",
      time: "10:00 AM",
      location: "School Science Lab & Hall"
    },
    {
      id: "e2",
      title: "Independence Day Celebration",
      description: "Flag hoisting ceremony, patriotic speech, cultural performances, and sweets distribution.",
      date: "2026-08-15",
      time: "08:00 AM",
      location: "Central Playground"
    },
    {
      id: "e3",
      title: "Teacher's Day Special Assembly",
      description: "Cultural program organized by senior secondary students to honor teachers.",
      date: "2026-09-05",
      time: "09:30 AM",
      location: "Auditorium"
    }
  ],
  admissions: [
    {
      id: "APP1001",
      fullName: "Amit Kumar Sharma",
      fatherName: "Ram Prakash Sharma",
      classApplied: "Class XI (Science)",
      gender: "Male",
      dob: "2011-04-12",
      phone: "9837012345",
      email: "amit.sharma@gmail.com",
      previousSchool: "Taj Model Public School",
      marksPercentage: 86.5,
      address: "Mughal Road, Taj Ganj, Agra",
      status: "Approved",
      submissionDate: "2026-06-21",
      remarks: "Documents verified. Fee payment pending."
    },
    {
      id: "APP1002",
      fullName: "Pooja Kumari Yadav",
      fatherName: "Devendra Yadav",
      classApplied: "Class IX",
      gender: "Female",
      dob: "2012-08-19",
      phone: "9897112233",
      email: "pooja.yadav@gmail.com",
      previousSchool: "Nagar Palika School, Agra",
      marksPercentage: 74.2,
      address: "Gobari Marg, Taj Ganj, Agra",
      status: "Pending",
      submissionDate: "2026-06-25",
      remarks: "Awaiting original marksheet."
    }
  ],
  downloads: [
    {
      id: "d1",
      title: "Class XI Science Quarterly Syllabus 2026-27",
      category: "Syllabus",
      fileUrl: "#",
      dateAdded: "2026-06-18",
      size: "1.2 MB"
    },
    {
      id: "d2",
      title: "Online Admission Form Guideline Prospectus",
      category: "Admission",
      fileUrl: "#",
      dateAdded: "2026-06-20",
      size: "2.4 MB"
    },
    {
      id: "d3",
      title: "School Academic Calendar & Holiday List 2026",
      category: "Other",
      fileUrl: "#",
      dateAdded: "2026-01-05",
      size: "850 KB"
    },
    {
      id: "d4",
      title: "Class X UP Board Sample Question Papers (Mathematics)",
      category: "Other",
      fileUrl: "#",
      dateAdded: "2026-05-12",
      size: "3.1 MB"
    }
  ],
  messages: [
    {
      id: "m1",
      name: "Sanjay Gupta",
      email: "sanjay.gupta@yahoo.com",
      subject: "Admission Inquiry",
      message: "Hello, I want to know if there are seats available in Class XI Commerce stream for my ward. What is the process?",
      dateAdded: "2026-06-26"
    }
  ]
};

// Helper to load database
function readDb() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2));
      return defaultData;
    }
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading database", err);
    return defaultData;
  }
}

// Helper to save database
function writeDb(data: any) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing database", err);
  }
}

// API Routes
app.get("/api/stats", (req, res) => {
  const db = readDb();
  res.json(db.stats);
});

app.post("/api/stats/visit", (req, res) => {
  const db = readDb();
  db.stats.visitorCount = (db.stats.visitorCount || 1423) + 1;
  writeDb(db);
  res.json({ success: true, visitorCount: db.stats.visitorCount });
});

app.get("/api/notices", (req, res) => {
  const db = readDb();
  res.json(db.notices);
});

app.post("/api/notices", (req, res) => {
  const db = readDb();
  const newNotice: Notice = {
    id: "n" + Date.now(),
    title: req.body.title || "Untitled Notice",
    content: req.body.content || "",
    date: new Date().toISOString().split("T")[0],
    category: req.body.category || "General",
    isUrgent: !!req.body.isUrgent,
    author: req.body.author || "School Admin"
  };
  db.notices.unshift(newNotice);
  db.stats.activeNotices = db.notices.length;
  writeDb(db);
  res.status(201).json(newNotice);
});

app.delete("/api/notices/:id", (req, res) => {
  const db = readDb();
  const id = req.params.id;
  db.notices = db.notices.filter((n: any) => n.id !== id);
  db.stats.activeNotices = db.notices.length;
  writeDb(db);
  res.json({ success: true });
});

app.get("/api/events", (req, res) => {
  const db = readDb();
  res.json(db.events);
});

app.post("/api/events", (req, res) => {
  const db = readDb();
  const newEvent: EventItem = {
    id: "e" + Date.now(),
    title: req.body.title || "Untitled Event",
    description: req.body.description || "",
    date: req.body.date || new Date().toISOString().split("T")[0],
    time: req.body.time || "",
    location: req.body.location || ""
  };
  db.events.push(newEvent);
  writeDb(db);
  res.status(201).json(newEvent);
});

app.get("/api/admissions", (req, res) => {
  const db = readDb();
  res.json(db.admissions);
});

app.post("/api/admissions", (req, res) => {
  const db = readDb();
  const applicationNumber = "APP" + Math.floor(1000 + Math.random() * 9000);
  const newApp: AdmissionApplication = {
    id: applicationNumber,
    fullName: req.body.fullName || "",
    fatherName: req.body.fatherName || "",
    classApplied: req.body.classApplied || "Class XI",
    gender: req.body.gender || "Male",
    dob: req.body.dob || "",
    phone: req.body.phone || "",
    email: req.body.email || "",
    previousSchool: req.body.previousSchool || "N/A",
    marksPercentage: parseFloat(req.body.marksPercentage) || 0,
    address: req.body.address || "",
    status: "Pending",
    submissionDate: new Date().toISOString().split("T")[0],
    remarks: "Form submitted successfully. Documents under review."
  };
  db.admissions.unshift(newApp);
  db.stats.totalAdmissions = db.admissions.length;
  writeDb(db);
  res.status(201).json(newApp);
});

app.patch("/api/admissions/:id", (req, res) => {
  const db = readDb();
  const id = req.params.id;
  const application = db.admissions.find((app: any) => app.id === id);
  if (!application) {
    return res.status(404).json({ error: "Application not found" });
  }
  if (req.body.status) application.status = req.body.status;
  if (req.body.remarks !== undefined) application.remarks = req.body.remarks;
  writeDb(db);
  res.json(application);
});

app.get("/api/admissions/status", (req, res) => {
  const db = readDb();
  const id = req.query.application_id as string;
  const application = db.admissions.find((app: any) => app.id?.toLowerCase() === id?.toLowerCase());
  if (!application) {
    return res.status(404).json({ error: "Application not found" });
  }
  res.json(application);
});

app.get("/api/downloads", (req, res) => {
  const db = readDb();
  res.json(db.downloads);
});

app.post("/api/downloads", (req, res) => {
  const db = readDb();
  const newDownload: DownloadItem = {
    id: "d" + Date.now(),
    title: req.body.title || "Syllabus File",
    category: req.body.category || "Other",
    fileUrl: req.body.fileUrl || "#",
    dateAdded: new Date().toISOString().split("T")[0],
    size: req.body.size || "1.0 MB"
  };
  db.downloads.unshift(newDownload);
  writeDb(db);
  res.status(201).json(newDownload);
});

app.delete("/api/downloads/:id", (req, res) => {
  const db = readDb();
  const id = req.params.id;
  db.downloads = db.downloads.filter((d: any) => d.id !== id);
  writeDb(db);
  res.json({ success: true });
});

app.get("/api/messages", (req, res) => {
  const db = readDb();
  res.json(db.messages);
});

app.post("/api/contact", (req, res) => {
  const db = readDb();
  const newMessage: Message = {
    id: "m" + Date.now(),
    name: req.body.name || "Anonymous",
    email: req.body.email || "",
    subject: req.body.subject || "No Subject",
    message: req.body.message || "",
    dateAdded: new Date().toISOString().split("T")[0]
  };
  db.messages.unshift(newMessage);
  writeDb(db);
  res.status(201).json({ success: true, message: "Your query has been submitted successfully." });
});

// Admin/Teacher & Student Login simulation
app.post("/api/login", (req, res) => {
  const { username, password, role } = req.body;
  if (role === "teacher") {
    // Standard credential check
    if (username === "admin" && password === "password123") {
      res.json({
        success: true,
        user: { name: "Principal & Admin", role: "teacher", username: "admin" }
      });
    } else {
      res.status(401).json({ error: "Invalid admin/teacher credentials. (Tip: Use 'admin' and 'password123')" });
    }
  } else if (role === "student") {
    // Look up application ID or roll number
    const db = readDb();
    const application = db.admissions.find((app: any) => app.id?.toLowerCase() === username?.toLowerCase());
    if (application) {
      res.json({
        success: true,
        user: {
          name: application.fullName,
          role: "student",
          rollNumber: application.id,
          classApplied: application.classApplied,
          status: application.status
        }
      });
    } else if (username?.toUpperCase() === "ROLL2026") {
      res.json({
        success: true,
        user: {
          name: "Saurabh Mishra (Roll: 10245)",
          role: "student",
          rollNumber: "ROLL2026",
          classApplied: "Class XII (Commerce)",
          status: "Approved"
        }
      });
    } else {
      res.status(401).json({ error: "Invalid Roll No or Application ID. (Tip: Use 'ROLL2026' or a submitted application ID like 'APP1001')" });
    }
  } else {
    res.status(400).json({ error: "Unknown login role" });
  }
});

async function startServer() {
  // Setup database if not exists
  readDb();

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
