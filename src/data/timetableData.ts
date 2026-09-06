import { TimetableSlot, AllowedBranch } from '../types';

export interface SectionTimetableMeta {
  branch: AllowedBranch;
  divisionName: string;
  semester: string;
  academicYear: string;
  group: string;
  lectureHall: string;
  classCoordinator: string;
  termDates: string;
  collegeName: string;
  instructors: Array<{
    code: string;
    title: string;
    short: string;
    credits: number;
    instructor: string;
    phone?: string;
  }>;
}

export const COLLEGE_INFO = {
  name: 'Adichunchanagiri Institute of Technology',
  location: 'Chikkamagaluru - 577102',
  academicYear: '2025-2026 / 2026-2027',
  scheme: 'VTU 2025-2026 Scheme',
};

export const SECTION_METAS: Record<AllowedBranch, SectionTimetableMeta> = {
  'AI/ML': {
    branch: 'AI/ML',
    divisionName: 'First Semester AI&ML',
    semester: '1st Semester',
    academicYear: '2026-27',
    group: 'Physics Group',
    lectureHall: 'LH - 03 (ADMINISTRATIVE BLOCK)',
    classCoordinator: 'Mr. Manikantha Prasad J',
    termDates: '24-08-2026 to 01-01-2027',
    collegeName: 'Adichunchanagiri Institute of Technology, Chikkamagaluru',
    instructors: [
      { code: '1BMATS101', title: 'Calculus and Linear Algebra', short: 'MAT', credits: 4, instructor: 'Dr. Sheshanth A S', phone: '9964319088' },
      { code: '1BPHYS102', title: 'Quantum Physics and Applications', short: 'PHY', credits: 4, instructor: 'Dr. Raghavendra S / Dr. Nagaraja S', phone: '8310205180' },
      { code: '1BCEDS103', title: 'Computer-Aided Engineering Drawing for CSE Stream', short: 'CAED', credits: 3, instructor: 'Mr. Ullas G S / Dr. Srinivasalah P H', phone: '9844241561' },
      { code: '1BESC104A', title: 'Building Sciences and Mechanics', short: 'BSM', credits: 3, instructor: 'Mr. Chethan V R', phone: '8310582759' },
      { code: '1BEIT105', title: 'Programming in C', short: 'PIC', credits: 3, instructor: 'Mr. Manikantha Prasad J', phone: '7795196915' },
      { code: '1BSKS106', title: 'Soft Skills', short: 'SS', credits: 1, instructor: 'Mr. Praveenkumar M', phone: '9742381917' },
      { code: '1BPOPL107', title: 'C Programming Lab', short: 'CP Lab', credits: 1, instructor: 'Mr. Manikantha Prasad J' },
      { code: '1BIDTL158', title: 'Innovation and Design Thinking Lab', short: 'IDTL', credits: 1, instructor: 'Mrs. Priyanka M C', phone: '8310604176' },
      { code: '1BKSK/BK109', title: 'Samskrutika Kannada (SK) / Balake Kannada (BK)', short: 'SK/BK', credits: 1, instructor: 'Mrs. Shakunthala B', phone: '7760805413' },
    ],
  },
  'CSE-A': {
    branch: 'CSE-A',
    divisionName: 'First Semester CS&E-A',
    semester: '1st Semester',
    academicYear: '2026-27',
    group: 'Physics Group',
    lectureHall: 'LH - 01 (ADMINISTRATIVE BLOCK)',
    classCoordinator: 'Mrs. Saritha N',
    termDates: '24-08-2026 to 01-01-2027',
    collegeName: 'Adichunchanagiri Institute of Technology, Chikkamagaluru',
    instructors: [
      { code: '1BMATS101', title: 'Calculus and Linear Algebra', short: 'MAT', credits: 4, instructor: 'Dr. Anitha L', phone: '9008443262' },
      { code: '1BPHYS102', title: 'Quantum Physics and Applications', short: 'PHY', credits: 4, instructor: 'Dr. Raghavendra S', phone: '9164323274' },
      { code: '1BCEDS103', title: 'Computer-Aided Engineering Drawing for CSE Stream', short: 'CAED', credits: 3, instructor: 'Mr. Rajanna D', phone: '9980967006' },
      { code: '1BESC104A', title: 'Building Sciences and Mechanics', short: 'BSM', credits: 3, instructor: 'Dr. Kavya B R', phone: '8861519334' },
      { code: '1BEIT105', title: 'Programming in C', short: 'PIC', credits: 3, instructor: 'Mrs. Saritha N', phone: '8431297741' },
      { code: '1BSKS106', title: 'Soft Skills', short: 'SS', credits: 1, instructor: 'Mr. Praveenkumar M', phone: '9742381917' },
      { code: '1BPOPL107', title: 'C Programming Lab', short: 'CP Lab', credits: 1, instructor: 'Mrs. Saritha N' },
      { code: '1BIDTL158', title: 'Innovation and Design Thinking Lab', short: 'IDTL', credits: 1, instructor: 'Dr. Chaithra I V', phone: '7899748444' },
      { code: '1BKSK/BK109', title: 'Samskrutika Kannada (SK) / Balake Kannada (BK)', short: 'SK/BK', credits: 1, instructor: 'Mrs. Shakunthala B', phone: '7760805413' },
    ],
  },
  'CSE-B': {
    branch: 'CSE-B',
    divisionName: 'First Semester CS&E-B',
    semester: '1st Semester',
    academicYear: '2026-27',
    group: 'Physics Group',
    lectureHall: 'LH - 02 (ADMINISTRATIVE BLOCK)',
    classCoordinator: 'Mr. Ravikumar',
    termDates: '24-08-2026 to 01-01-2027',
    collegeName: 'Adichunchanagiri Institute of Technology, Chikkamagaluru',
    instructors: [
      { code: '1BMATS101', title: 'Calculus and Linear Algebra', short: 'MAT', credits: 4, instructor: 'Mr. Vinay K U', phone: '9480737127' },
      { code: '1BPHYS102', title: 'Quantum Physics and Applications', short: 'PHY', credits: 4, instructor: 'Dr. Raghavendra S / Physics Dept' },
      { code: '1BCEDS103', title: 'Computer-Aided Engineering Drawing for CSE Stream', short: 'CAED', credits: 3, instructor: 'Dr. Srinivasalah P', phone: '8310518796' },
      { code: '1BESC104A', title: 'Building Sciences and Mechanics', short: 'BSM', credits: 3, instructor: 'Mr. Chethan V R', phone: '8310582759' },
      { code: '1BEIT105', title: 'Programming in C', short: 'PIC', credits: 3, instructor: 'Mr. Ravikumar', phone: '9741970005' },
      { code: '1BSKS106', title: 'Soft Skills', short: 'SS', credits: 1, instructor: 'Mr. Praveenkumar M', phone: '9742381917' },
      { code: '1BPOPL107', title: 'C Programming Lab', short: 'CP Lab', credits: 1, instructor: 'Mr. Ravikumar' },
      { code: '1BIDTL158', title: 'Innovation and Design Thinking Lab', short: 'IDTL', credits: 1, instructor: 'Mr. Ravikumar' },
      { code: '1BKSK/BK109', title: 'Samskrutika Kannada (SK) / Balake Kannada (BK)', short: 'SK/BK', credits: 1, instructor: 'Mrs. Shakunthala B', phone: '7760805413' },
    ],
  },
};

export const OFFICIAL_TIMETABLES: Record<AllowedBranch, TimetableSlot[]> = {
  'AI/ML': [
    // Monday
    { id: 'aiml-mo-1', branch: 'AI/ML', day: 'Monday', time: '09.00 - 10.00', subjectCode: '1BESC104A', subjectName: 'Building Sciences & Mechanics (BSM)', type: 'Lecture', room: 'LH - 03' },
    { id: 'aiml-mo-2', branch: 'AI/ML', day: 'Monday', time: '10.00 - 11.00', subjectCode: '1BMATS101', subjectName: 'Calculus and Linear Algebra (MAT)', type: 'Lecture', room: 'LH - 03' },
    { id: 'aiml-mo-3', branch: 'AI/ML', day: 'Monday', time: '11.15 - 12.15', subjectCode: '1BEIT105', subjectName: 'Programming in C (PIC)', type: 'Lecture', room: 'LH - 03' },
    { id: 'aiml-mo-4', branch: 'AI/ML', day: 'Monday', time: '12.15 - 01.15', subjectCode: '1BPHYS102', subjectName: 'Quantum Physics and Applications (PHY)', type: 'Lecture', room: 'LH - 03' },
    { id: 'aiml-mo-5', branch: 'AI/ML', day: 'Monday', time: '02.30 - 05.00', subjectCode: '1BPHYS102 / 1BPOPL107', subjectName: 'PHY LAB / CP LAB', type: 'Lab', room: 'Physics / Computing Lab' },

    // Tuesday
    { id: 'aiml-tu-1', branch: 'AI/ML', day: 'Tuesday', time: '09.00 - 11.00', subjectCode: '1BPHYS102 / 1BPOPL107', subjectName: 'PHY LAB / CP LAB', type: 'Lab', room: 'Physics / Computing Lab' },
    { id: 'aiml-tu-2', branch: 'AI/ML', day: 'Tuesday', time: '11.15 - 12.15', subjectCode: '1BMATS101', subjectName: 'Calculus and Linear Algebra (MAT)', type: 'Lecture', room: 'LH - 03' },
    { id: 'aiml-tu-3', branch: 'AI/ML', day: 'Tuesday', time: '12.15 - 01.15', subjectCode: '1BEIT105', subjectName: 'Programming in C (PIC)', type: 'Lecture', room: 'LH - 03' },
    { id: 'aiml-tu-4', branch: 'AI/ML', day: 'Tuesday', time: '02.30 - 03.20', subjectCode: '1BSKS106', subjectName: 'Soft Skills (SS)', type: 'Lecture', room: 'LH - 03' },
    { id: 'aiml-tu-5', branch: 'AI/ML', day: 'Tuesday', time: '03.20 - 04.10', subjectCode: '1BPHYS102', subjectName: 'Quantum Physics (PHY)', type: 'Lecture', room: 'LH - 03' },
    { id: 'aiml-tu-6', branch: 'AI/ML', day: 'Tuesday', time: '04.10 - 05.00', subjectCode: '1BESC104A', subjectName: 'Building Sciences & Mechanics (BSM)', type: 'Lecture', room: 'LH - 03' },

    // Wednesday
    { id: 'aiml-we-1', branch: 'AI/ML', day: 'Wednesday', time: '09.00 - 11.00', subjectCode: '1BCEDS103', subjectName: 'Computer-Aided Engg Drawing (CAED)', type: 'Lecture', room: 'CAED Lab / LH-03' },
    { id: 'aiml-we-2', branch: 'AI/ML', day: 'Wednesday', time: '11.15 - 12.15', subjectCode: '1BCEDS103', subjectName: 'Computer-Aided Engg Drawing (CAED)', type: 'Lecture', room: 'CAED Lab / LH-03' },
    { id: 'aiml-we-3', branch: 'AI/ML', day: 'Wednesday', time: '02.30 - 03.20', subjectCode: '1BPHYS102', subjectName: 'Quantum Physics (PHY)', type: 'Lecture', room: 'LH - 03' },
    { id: 'aiml-we-4', branch: 'AI/ML', day: 'Wednesday', time: '03.20 - 04.10', subjectCode: '1BMATS101', subjectName: 'Calculus and Linear Algebra (MAT)', type: 'Lecture', room: 'LH - 03' },
    { id: 'aiml-we-5', branch: 'AI/ML', day: 'Wednesday', time: '04.10 - 05.00', subjectCode: '1BEIT105', subjectName: 'Programming in C (PIC)', type: 'Lecture', room: 'LH - 03' },

    // Thursday
    { id: 'aiml-th-1', branch: 'AI/ML', day: 'Thursday', time: '09.00 - 10.00', subjectCode: '1BPHYS102', subjectName: 'Quantum Physics (PHY)', type: 'Lecture', room: 'LH - 03' },
    { id: 'aiml-th-2', branch: 'AI/ML', day: 'Thursday', time: '10.00 - 11.00', subjectCode: '1BKSK/BK109', subjectName: 'Samskrutika / Balake Kannada (SK/BK)', type: 'Lecture', room: 'LH - 03' },
    { id: 'aiml-th-3', branch: 'AI/ML', day: 'Thursday', time: '11.15 - 12.15', subjectCode: '1BMATS101', subjectName: 'Calculus and Linear Algebra (MAT)', type: 'Lecture', room: 'LH - 03' },
    { id: 'aiml-th-4', branch: 'AI/ML', day: 'Thursday', time: '12.15 - 01.15', subjectCode: '1BESC104A', subjectName: 'Building Sciences & Mechanics (BSM)', type: 'Lecture', room: 'LH - 03' },
    { id: 'aiml-th-5', branch: 'AI/ML', day: 'Thursday', time: '02.30 - 05.00', subjectCode: '1BCEDS103', subjectName: 'Computer-Aided Engg Drawing (CAED)', type: 'Lecture', room: 'CAED Lab' },

    // Friday
    { id: 'aiml-fr-1', branch: 'AI/ML', day: 'Friday', time: '09.00 - 10.00', subjectCode: '1BEIT105', subjectName: 'Programming in C (PIC)', type: 'Lecture', room: 'LH - 03' },
    { id: 'aiml-fr-2', branch: 'AI/ML', day: 'Friday', time: '10.00 - 11.00', subjectCode: '1BPHYS102', subjectName: 'Quantum Physics (PHY)', type: 'Lecture', room: 'LH - 03' },
    { id: 'aiml-fr-3', branch: 'AI/ML', day: 'Friday', time: '11.15 - 12.15', subjectCode: '1BESC104A', subjectName: 'Building Sciences & Mechanics (BSM)', type: 'Lecture', room: 'LH - 03' },
    { id: 'aiml-fr-4', branch: 'AI/ML', day: 'Friday', time: '12.15 - 01.15', subjectCode: '1BMATS101', subjectName: 'Calculus and Linear Algebra (MAT)', type: 'Lecture', room: 'LH - 03' },
    { id: 'aiml-fr-5', branch: 'AI/ML', day: 'Friday', time: '02.30 - 05.00', subjectCode: '1BPHYS102 / 1BPOPL107', subjectName: 'PHY LAB / CP LAB', type: 'Lab', room: 'Physics / Computing Lab' },

    // Saturday
    { id: 'aiml-sa-1', branch: 'AI/ML', day: 'Saturday', time: '09.00 - 11.00', subjectCode: '1BIDTL158', subjectName: 'Innovation & Design Thinking Lab (IDTL)', type: 'Lab', room: 'IDT Lab' },
    { id: 'aiml-sa-2', branch: 'AI/ML', day: 'Saturday', time: '11.15 - 12.15', subjectCode: '1BIDTL158', subjectName: 'Innovation & Design Thinking Lab (IDTL)', type: 'Lab', room: 'IDT Lab' },
    { id: 'aiml-sa-3', branch: 'AI/ML', day: 'Saturday', time: '02.30 - 05.00', subjectCode: 'TUTORIAL', subjectName: 'Tutorial Classes / Mentoring', type: 'Tutorial', room: 'LH - 03' },
  ],

  'CSE-A': [
    // Monday
    { id: 'csea-mo-1', branch: 'CSE-A', day: 'Monday', time: '09.00 - 10.00', subjectCode: '1BSKS106', subjectName: 'Soft Skills (SS)', type: 'Lecture', room: 'LH - 01' },
    { id: 'csea-mo-2', branch: 'CSE-A', day: 'Monday', time: '10.00 - 11.00', subjectCode: '1BPHYS102', subjectName: 'Quantum Physics (PHY)', type: 'Lecture', room: 'LH - 01' },
    { id: 'csea-mo-3', branch: 'CSE-A', day: 'Monday', time: '11.15 - 12.15', subjectCode: '1BMATS101', subjectName: 'Calculus and Linear Algebra (MAT)', type: 'Lecture', room: 'LH - 01' },
    { id: 'csea-mo-4', branch: 'CSE-A', day: 'Monday', time: '12.15 - 01.15', subjectCode: '1BEIT105', subjectName: 'Programming in C (PIC)', type: 'Lecture', room: 'LH - 01' },
    { id: 'csea-mo-5', branch: 'CSE-A', day: 'Monday', time: '02.30 - 05.00', subjectCode: '1BCEDS103', subjectName: 'Computer-Aided Engg Drawing (CAED)', type: 'Lecture', room: 'CAED Lab' },

    // Tuesday
    { id: 'csea-tu-1', branch: 'CSE-A', day: 'Tuesday', time: '09.00 - 10.00', subjectCode: '1BMATS101', subjectName: 'Calculus and Linear Algebra (MAT)', type: 'Lecture', room: 'LH - 01' },
    { id: 'csea-tu-2', branch: 'CSE-A', day: 'Tuesday', time: '10.00 - 11.00', subjectCode: '1BPHYS102', subjectName: 'Quantum Physics (PHY)', type: 'Lecture', room: 'LH - 01' },
    { id: 'csea-tu-3', branch: 'CSE-A', day: 'Tuesday', time: '11.15 - 12.15', subjectCode: '1BEIT105', subjectName: 'Programming in C (PIC)', type: 'Lecture', room: 'LH - 01' },
    { id: 'csea-tu-4', branch: 'CSE-A', day: 'Tuesday', time: '12.15 - 01.15', subjectCode: '1BESC104A', subjectName: 'Building Sciences & Mechanics (BSM)', type: 'Lecture', room: 'LH - 01' },
    { id: 'csea-tu-5', branch: 'CSE-A', day: 'Tuesday', time: '02.30 - 05.00', subjectCode: '1BPHYS102 / 1BPOPL107', subjectName: 'PHY LAB / CP LAB', type: 'Lab', room: 'Physics / Computing Lab' },

    // Wednesday
    { id: 'csea-we-1', branch: 'CSE-A', day: 'Wednesday', time: '09.00 - 10.00', subjectCode: '1BPHYS102', subjectName: 'Quantum Physics (PHY)', type: 'Lecture', room: 'LH - 01' },
    { id: 'csea-we-2', branch: 'CSE-A', day: 'Wednesday', time: '10.00 - 11.00', subjectCode: '1BEIT105', subjectName: 'Programming in C (PIC)', type: 'Lecture', room: 'LH - 01' },
    { id: 'csea-we-3', branch: 'CSE-A', day: 'Wednesday', time: '11.15 - 01.15', subjectCode: '1BPHYS102 / 1BPOPL107', subjectName: 'PHY LAB / CP LAB', type: 'Lab', room: 'Physics / Computing Lab' },
    { id: 'csea-we-4', branch: 'CSE-A', day: 'Wednesday', time: '02.30 - 03.20', subjectCode: '1BKSK/BK109', subjectName: 'Samskrutika / Balake Kannada (SK/BK)', type: 'Lecture', room: 'LH - 01' },
    { id: 'csea-we-5', branch: 'CSE-A', day: 'Wednesday', time: '03.20 - 04.10', subjectCode: '1BESC104A', subjectName: 'Building Sciences & Mechanics (BSM)', type: 'Lecture', room: 'LH - 01' },
    { id: 'csea-we-6', branch: 'CSE-A', day: 'Wednesday', time: '04.10 - 05.00', subjectCode: '1BMATS101', subjectName: 'Calculus and Linear Algebra (MAT)', type: 'Lecture', room: 'LH - 01' },

    // Thursday
    { id: 'csea-th-1', branch: 'CSE-A', day: 'Thursday', time: '09.00 - 11.00', subjectCode: '1BPHYS102 / 1BPOPL107', subjectName: 'PHY LAB / CP LAB', type: 'Lab', room: 'Physics / Computing Lab' },
    { id: 'csea-th-2', branch: 'CSE-A', day: 'Thursday', time: '11.15 - 12.15', subjectCode: '1BESC104A', subjectName: 'Building Sciences & Mechanics (BSM)', type: 'Lecture', room: 'LH - 01' },
    { id: 'csea-th-3', branch: 'CSE-A', day: 'Thursday', time: '12.15 - 01.15', subjectCode: '1BPHYS102', subjectName: 'Quantum Physics (PHY)', type: 'Lecture', room: 'LH - 01' },
    { id: 'csea-th-4', branch: 'CSE-A', day: 'Thursday', time: '02.30 - 03.20', subjectCode: '1BMATS101', subjectName: 'Calculus and Linear Algebra (MAT)', type: 'Lecture', room: 'LH - 01' },
    { id: 'csea-th-5', branch: 'CSE-A', day: 'Thursday', time: '03.20 - 04.10', subjectCode: '1BEIT105', subjectName: 'Programming in C (PIC)', type: 'Lecture', room: 'LH - 01' },
    { id: 'csea-th-6', branch: 'CSE-A', day: 'Thursday', time: '04.10 - 05.00', subjectCode: '1BEIT105', subjectName: 'Programming in C (PIC)', type: 'Lecture', room: 'LH - 01' },

    // Friday
    { id: 'csea-fr-1', branch: 'CSE-A', day: 'Friday', time: '09.00 - 11.00', subjectCode: '1BCEDS103', subjectName: 'Computer-Aided Engg Drawing (CAED)', type: 'Lecture', room: 'CAED Lab' },
    { id: 'csea-fr-2', branch: 'CSE-A', day: 'Friday', time: '11.15 - 12.15', subjectCode: '1BCEDS103', subjectName: 'Computer-Aided Engg Drawing (CAED)', type: 'Lecture', room: 'CAED Lab' },
    { id: 'csea-fr-3', branch: 'CSE-A', day: 'Friday', time: '02.30 - 03.20', subjectCode: '1BESC104A', subjectName: 'Building Sciences & Mechanics (BSM)', type: 'Lecture', room: 'LH - 01' },
    { id: 'csea-fr-4', branch: 'CSE-A', day: 'Friday', time: '03.20 - 04.10', subjectCode: '1BPHYS102', subjectName: 'Quantum Physics (PHY)', type: 'Lecture', room: 'LH - 01' },
    { id: 'csea-fr-5', branch: 'CSE-A', day: 'Friday', time: '04.10 - 05.00', subjectCode: '1BMATS101', subjectName: 'Calculus and Linear Algebra (MAT)', type: 'Lecture', room: 'LH - 01' },

    // Saturday
    { id: 'csea-sa-1', branch: 'CSE-A', day: 'Saturday', time: '09.00 - 11.00', subjectCode: '1BIDTL158', subjectName: 'Innovation & Design Thinking Lab (IDTL)', type: 'Lab', room: 'IDT Lab' },
    { id: 'csea-sa-2', branch: 'CSE-A', day: 'Saturday', time: '11.15 - 12.15', subjectCode: '1BIDTL158', subjectName: 'Innovation & Design Thinking Lab (IDTL)', type: 'Lab', room: 'IDT Lab' },
    { id: 'csea-sa-3', branch: 'CSE-A', day: 'Saturday', time: '02.30 - 05.00', subjectCode: 'TUTORIAL', subjectName: 'Tutorial Classes / Mentoring', type: 'Tutorial', room: 'LH - 01' },
  ],

  'CSE-B': [
    // Monday
    { id: 'cseb-mo-1', branch: 'CSE-B', day: 'Monday', time: '09.00 - 10.00', subjectCode: '1BMATS101', subjectName: 'Calculus and Linear Algebra (MAT)', type: 'Lecture', room: 'LH - 02' },
    { id: 'cseb-mo-2', branch: 'CSE-B', day: 'Monday', time: '10.00 - 11.00', subjectCode: '1BEIT105', subjectName: 'Programming in C (PIC)', type: 'Lecture', room: 'LH - 02' },
    { id: 'cseb-mo-3', branch: 'CSE-B', day: 'Monday', time: '11.15 - 01.15', subjectCode: '1BPHYS102 / 1BPOPL107', subjectName: 'PHY LAB / CP LAB', type: 'Lab', room: 'Physics / Computing Lab' },
    { id: 'cseb-mo-4', branch: 'CSE-B', day: 'Monday', time: '02.30 - 03.20', subjectCode: '1BKSK/BK109', subjectName: 'Samskrutika / Balake Kannada (SK/BK)', type: 'Lecture', room: 'LH - 02' },
    { id: 'cseb-mo-5', branch: 'CSE-B', day: 'Monday', time: '03.20 - 04.10', subjectCode: '1BESC104A', subjectName: 'Building Sciences & Mechanics (BSM)', type: 'Lecture', room: 'LH - 02' },
    { id: 'cseb-mo-6', branch: 'CSE-B', day: 'Monday', time: '04.10 - 05.00', subjectCode: '1BPHYS102', subjectName: 'Quantum Physics (PHY)', type: 'Lecture', room: 'LH - 02' },

    // Tuesday
    { id: 'cseb-tu-1', branch: 'CSE-B', day: 'Tuesday', time: '09.00 - 11.00', subjectCode: '1BCEDS103', subjectName: 'Computer-Aided Engg Drawing (CAED)', type: 'Lecture', room: 'CAED Lab' },
    { id: 'cseb-tu-2', branch: 'CSE-B', day: 'Tuesday', time: '11.15 - 12.15', subjectCode: '1BCEDS103', subjectName: 'Computer-Aided Engg Drawing (CAED)', type: 'Lecture', room: 'CAED Lab' },
    { id: 'cseb-tu-3', branch: 'CSE-B', day: 'Tuesday', time: '02.30 - 03.20', subjectCode: '1BEIT105', subjectName: 'Programming in C (PIC)', type: 'Lecture', room: 'LH - 02' },
    { id: 'cseb-tu-4', branch: 'CSE-B', day: 'Tuesday', time: '03.20 - 04.10', subjectCode: '1BPHYS102', subjectName: 'Quantum Physics (PHY)', type: 'Lecture', room: 'LH - 02' },
    { id: 'cseb-tu-5', branch: 'CSE-B', day: 'Tuesday', time: '04.10 - 05.00', subjectCode: '1BMATS101', subjectName: 'Calculus and Linear Algebra (MAT)', type: 'Lecture', room: 'LH - 02' },

    // Wednesday
    { id: 'cseb-we-1', branch: 'CSE-B', day: 'Wednesday', time: '09.00 - 10.00', subjectCode: '1BSKS106', subjectName: 'Soft Skills (SS)', type: 'Lecture', room: 'LH - 02' },
    { id: 'cseb-we-2', branch: 'CSE-B', day: 'Wednesday', time: '10.00 - 11.00', subjectCode: '1BPHYS102', subjectName: 'Quantum Physics (PHY)', type: 'Lecture', room: 'LH - 02' },
    { id: 'cseb-we-3', branch: 'CSE-B', day: 'Wednesday', time: '11.15 - 12.15', subjectCode: '1BMATS101', subjectName: 'Calculus and Linear Algebra (MAT)', type: 'Lecture', room: 'LH - 02' },
    { id: 'cseb-we-4', branch: 'CSE-B', day: 'Wednesday', time: '12.15 - 01.15', subjectCode: '1BESC104A', subjectName: 'Building Sciences & Mechanics (BSM)', type: 'Lecture', room: 'LH - 02' },
    { id: 'cseb-we-5', branch: 'CSE-B', day: 'Wednesday', time: '02.30 - 05.00', subjectCode: '1BCEDS103', subjectName: 'Computer-Aided Engg Drawing (CAED)', type: 'Lecture', room: 'CAED Lab' },

    // Thursday
    { id: 'cseb-th-1', branch: 'CSE-B', day: 'Thursday', time: '09.00 - 10.00', subjectCode: '1BPHYS102', subjectName: 'Quantum Physics (PHY)', type: 'Lecture', room: 'LH - 02' },
    { id: 'cseb-th-2', branch: 'CSE-B', day: 'Thursday', time: '10.00 - 11.00', subjectCode: '1BESC104A', subjectName: 'Building Sciences & Mechanics (BSM)', type: 'Lecture', room: 'LH - 02' },
    { id: 'cseb-th-3', branch: 'CSE-B', day: 'Thursday', time: '11.15 - 12.15', subjectCode: '1BMATS101', subjectName: 'Calculus and Linear Algebra (MAT)', type: 'Lecture', room: 'LH - 02' },
    { id: 'cseb-th-4', branch: 'CSE-B', day: 'Thursday', time: '12.15 - 01.15', subjectCode: '1BEIT105', subjectName: 'Programming in C (PIC)', type: 'Lecture', room: 'LH - 02' },
    { id: 'cseb-th-5', branch: 'CSE-B', day: 'Thursday', time: '02.30 - 05.00', subjectCode: '1BPHYS102 / 1BPOPL107', subjectName: 'PHY LAB / CP LAB', type: 'Lab', room: 'Physics / Computing Lab' },

    // Friday
    { id: 'cseb-fr-1', branch: 'CSE-B', day: 'Friday', time: '09.00 - 11.00', subjectCode: '1BPHYS102 / 1BPOPL107', subjectName: 'PHY LAB / CP LAB', type: 'Lab', room: 'Physics / Computing Lab' },
    { id: 'cseb-fr-2', branch: 'CSE-B', day: 'Friday', time: '11.15 - 12.15', subjectCode: '1BEIT105', subjectName: 'Programming in C (PIC)', type: 'Lecture', room: 'LH - 02' },
    { id: 'cseb-fr-3', branch: 'CSE-B', day: 'Friday', time: '12.15 - 01.15', subjectCode: '1BMATS101', subjectName: 'Calculus and Linear Algebra (MAT)', type: 'Lecture', room: 'LH - 02' },
    { id: 'cseb-fr-4', branch: 'CSE-B', day: 'Friday', time: '02.30 - 03.20', subjectCode: '1BPHYS102', subjectName: 'Quantum Physics (PHY)', type: 'Lecture', room: 'LH - 02' },
    { id: 'cseb-fr-5', branch: 'CSE-B', day: 'Friday', time: '03.20 - 04.10', subjectCode: '1BESC104A', subjectName: 'Building Sciences & Mechanics (BSM)', type: 'Lecture', room: 'LH - 02' },

    // Saturday
    { id: 'cseb-sa-1', branch: 'CSE-B', day: 'Saturday', time: '09.00 - 11.00', subjectCode: '1BIDTL158', subjectName: 'Innovation & Design Thinking Lab (IDTL)', type: 'Lab', room: 'IDT Lab' },
    { id: 'cseb-sa-2', branch: 'CSE-B', day: 'Saturday', time: '11.15 - 12.15', subjectCode: '1BIDTL158', subjectName: 'Innovation & Design Thinking Lab (IDTL)', type: 'Lab', room: 'IDT Lab' },
    { id: 'cseb-sa-3', branch: 'CSE-B', day: 'Saturday', time: '02.30 - 05.00', subjectCode: 'TUTORIAL', subjectName: 'Tutorial Classes / Mentoring', type: 'Tutorial', room: 'LH - 02' },
  ],
};

export const BRANCH_METADATA: Record<
  AllowedBranch,
  {
    section: string;
    room: string;
    coordinator: string;
    termDates: string;
  }
> = {
  'AI/ML': {
    section: SECTION_METAS['AI/ML'].divisionName,
    room: SECTION_METAS['AI/ML'].lectureHall,
    coordinator: SECTION_METAS['AI/ML'].classCoordinator,
    termDates: SECTION_METAS['AI/ML'].termDates,
  },
  'CSE-A': {
    section: SECTION_METAS['CSE-A'].divisionName,
    room: SECTION_METAS['CSE-A'].lectureHall,
    coordinator: SECTION_METAS['CSE-A'].classCoordinator,
    termDates: SECTION_METAS['CSE-A'].termDates,
  },
  'CSE-B': {
    section: SECTION_METAS['CSE-B'].divisionName,
    room: SECTION_METAS['CSE-B'].lectureHall,
    coordinator: SECTION_METAS['CSE-B'].classCoordinator,
    termDates: SECTION_METAS['CSE-B'].termDates,
  },
};

export const FACULTY_BY_BRANCH: Record<
  AllowedBranch,
  Array<{
    code: string;
    title: string;
    short: string;
    credits: number;
    hours?: number;
    faculty: string;
    phone: string;
  }>
> = {
  'AI/ML': SECTION_METAS['AI/ML'].instructors.map((i) => ({
    code: i.code,
    title: i.title,
    short: i.short,
    credits: i.credits,
    hours: i.credits * 13,
    faculty: i.instructor,
    phone: i.phone || '9964319088',
  })),
  'CSE-A': SECTION_METAS['CSE-A'].instructors.map((i) => ({
    code: i.code,
    title: i.title,
    short: i.short,
    credits: i.credits,
    hours: i.credits * 13,
    faculty: i.instructor,
    phone: i.phone || '9481234567',
  })),
  'CSE-B': SECTION_METAS['CSE-B'].instructors.map((i) => ({
    code: i.code,
    title: i.title,
    short: i.short,
    credits: i.credits,
    hours: i.credits * 13,
    faculty: i.instructor,
    phone: i.phone || '9481234568',
  })),
};

