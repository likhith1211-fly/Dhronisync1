import { Subject } from '../types';

export const VTU_SUBJECTS: Subject[] = [
  // ==========================================
  // SEMESTER 1 (Physics Group - 2025-2026 Scheme)
  // For CSE-A, CSE-B, AI/ML
  // ==========================================
  {
    id: '1BMATS101',
    code: '1BMATS101',
    name: 'Calculus and Linear Algebra',
    shortName: 'Calculus & Linear Algebra (MAT)',
    semester: 1,
    credits: 4,
    category: 'Basic Science',
    stream: 'CSE/AI-ML',
    description: 'Polar coordinates, differential calculus, series expansions, ordinary differential equations, and linear algebra for CSE and AI/ML streams.',
    iconName: 'Calculator',
    modules: [
      {
        id: 'mat1-m1',
        moduleNumber: 1,
        title: 'Calculus & Polar Curves',
        summary: 'Polar coordinates, angle between radius vector and tangent, intersection of polar curves, pedal equations and curvature.',
        hours: 8,
        topics: [
          {
            id: 'mat1-m1-t1',
            title: 'Polar Coordinates & Angle Between Tangent and Radius Vector',
            subtopics: [
              { id: 'st-mat1-1', title: 'Polar coordinates system & Polar curves graph representation', description: 'Curves r = f(θ), relationship between Cartesian (x, y) and polar (r, θ).' },
              { id: 'st-mat1-2', title: 'Angle between radius vector and tangent (tan φ = r dθ/dr)', description: 'Derivations for cardiods, lemniscates, and logarithmic spirals.' },
              { id: 'st-mat1-3', title: 'Angle of intersection of two polar curves', description: 'Finding points of intersection and computing |φ1 - φ2|; orthogonality condition.' }
            ]
          },
          {
            id: 'mat1-m1-t2',
            title: 'Pedal Equations & Curvature',
            subtopics: [
              { id: 'st-mat1-4', title: 'Pedal equations (p-r equation) for polar curves', description: 'Eliminating θ using p = r sin φ and differential relations.' },
              { id: 'st-mat1-5', title: 'Radius of curvature in Cartesian coordinates', description: 'Formula ρ = (1 + y\'²)^(3/2) / y\'\' for explicit curves.' },
              { id: 'st-mat1-6', title: 'Radius of curvature in Polar coordinates', description: 'Formula ρ = (r² + r1²)^(3/2) / (r² + 2r1² - r·r2).' }
            ]
          }
        ]
      },
      {
        id: 'mat1-m2',
        moduleNumber: 2,
        title: 'Series Expansion & Multivariable Calculus',
        summary: "Taylor's theorem, Maclaurin's series, indeterminate forms, partial derivatives, and Jacobians.",
        hours: 8,
        topics: [
          {
            id: 'mat1-m2-t1',
            title: 'Series Expansions & Indeterminate Forms',
            subtopics: [
              { id: 'st-mat1-7', title: "Taylor's Theorem & Maclaurin's Series of single variable", description: 'Expansions of standard trigonometric, logarithmic and exponential functions.' },
              { id: 'st-mat1-8', title: "Indeterminate Forms & L'Hopital's Rule", description: 'Evaluation of limits for 0/0, ∞/∞, 0·∞, 1^∞, 0^0, ∞^0.' }
            ]
          },
          {
            id: 'mat1-m2-t2',
            title: 'Partial Differentiation & Jacobians',
            subtopics: [
              { id: 'st-mat1-9', title: 'Partial derivatives, Euler\'s theorem for homogeneous functions', description: 'Verification and evaluation for degree n homogeneous functions.' },
              { id: 'st-mat1-10', title: 'Jacobians: Definition, properties and coordinate transformations', description: 'Jacobian of implicit functions, transformation from Cartesian to polar/cylindrical.' },
              { id: 'st-mat1-11', title: 'Maxima and Minima of functions of two variables', description: 'Conditions for extreme values (rt - s² > 0) and Lagrange\'s undetermined multipliers.' }
            ]
          }
        ]
      },
      {
        id: 'mat1-m3',
        moduleNumber: 3,
        title: 'Ordinary Differential Equations of First Order',
        summary: 'Exact ODEs, reducible to exact with integrating factors, linear and Bernoulli equations, applications to orthogonal trajectories.',
        hours: 8,
        topics: [
          {
            id: 'mat1-m3-t1',
            title: 'Linear & Exact Differential Equations',
            subtopics: [
              { id: 'st-mat1-12', title: 'First order Linear Differential Equations (dy/dx + Py = Q)', description: 'Integrating factor e^(∫P dx) and general solution.' },
              { id: 'st-mat1-13', title: "Bernoulli's Differential Equation reducible to linear form", description: 'Substitution z = y^(1-n) to reduce non-linear forms.' },
              { id: 'st-mat1-14', title: 'Exact Differential Equations (M dx + N dy = 0)', description: 'Condition ∂M/∂y = ∂N/∂x and finding general solution.' }
            ]
          },
          {
            id: 'mat1-m3-t2',
            title: 'Non-Exact Equations & Physical Applications',
            subtopics: [
              { id: 'st-mat1-15', title: 'Integrating Factors for non-exact equations', description: 'Rules for finding IF: (1/N)(∂M/∂y - ∂N/∂x) = f(x).' },
              { id: 'st-mat1-16', title: 'Orthogonal Trajectories in Cartesian and Polar forms', description: 'Finding families of curves intersecting at right angles.' },
              { id: 'st-mat1-17', title: "Newton's Law of Cooling and L-R Electrical Circuits", description: 'Modeling rate of heat dissipation and current transient response.' }
            ]
          }
        ]
      },
      {
        id: 'mat1-m4',
        moduleNumber: 4,
        title: 'Linear Algebra: System of Linear Equations',
        summary: 'Rank of a matrix, elementary row operations, Gauss elimination, Gauss-Jordan, and consistency of linear systems.',
        hours: 8,
        topics: [
          {
            id: 'mat1-m4-t1',
            title: 'Matrix Rank & Row Echelon Form',
            subtopics: [
              { id: 'st-mat1-18', title: 'Rank of matrix by elementary row operations & Echelon Form', description: 'Row reduction, pivot elements, invariant rank properties.' },
              { id: 'st-mat1-19', title: 'Consistency of system of linear equations (AX = B)', description: 'Rouche-Capelli theorem: Rank(A) = Rank([A|B]) conditions for unique, infinite, or no solution.' }
            ]
          },
          {
            id: 'mat1-m4-t2',
            title: 'Direct & Iterative Methods',
            subtopics: [
              { id: 'st-mat1-20', title: 'Gauss Elimination method & Gauss-Jordan method', description: 'Upper triangular elimination and reduced row echelon form.' },
              { id: 'st-mat1-21', title: 'Gauss-Seidel and Gauss-Jacobi iterative methods', description: 'Diagonal dominance criterion and convergence analysis.' }
            ]
          }
        ]
      },
      {
        id: 'mat1-m5',
        moduleNumber: 5,
        title: 'Eigenvalues, Eigenvectors & Diagonalization',
        summary: 'Characteristic equation, Cayley-Hamilton theorem, Rayleigh power method, and quadratic forms.',
        hours: 8,
        topics: [
          {
            id: 'mat1-m5-t1',
            title: 'Eigenvalues and Eigenvectors',
            subtopics: [
              { id: 'st-mat1-22', title: 'Eigenvalues and Eigenvectors calculation for square matrices', description: 'det(A - λI) = 0 and solving (A - λI)X = 0.' },
              { id: 'st-mat1-23', title: 'Properties of eigenvalues and eigenvectors', description: 'Trace equals sum, determinant equals product; distinct eigenvalues.' },
              { id: 'st-mat1-24', title: "Cayley-Hamilton Theorem & Matrix Inverse computation", description: 'Every square matrix satisfies its characteristic polynomial; evaluating A^-1 and higher powers.' }
            ]
          },
          {
            id: 'mat1-m5-t2',
            title: 'Power Method & Diagonalization',
            subtopics: [
              { id: 'st-mat1-25', title: "Rayleigh's Power Method for largest eigenvalue and vector", description: 'Iterative matrix-vector multiplication convergence.' },
              { id: 'st-mat1-26', title: 'Diagonalization of symmetric matrices and Quadratic Forms', description: 'Modal matrix P such that P^-1 A P = D; canonical reduction.' }
            ]
          }
        ]
      }
    ]
  },

  {
    id: '1BPHYS102',
    code: '1BPHYS102',
    name: 'Quantum Physics and Applications',
    shortName: 'Quantum Physics & Applications (PHY)',
    semester: 1,
    credits: 4,
    category: 'Basic Science',
    stream: 'CSE/AI-ML',
    description: 'Quantum mechanics, lasers, optical fibers, semiconductor physics, and modern nanotechnology for computing.',
    iconName: 'Atom',
    modules: [
      {
        id: 'phy1-m1',
        moduleNumber: 1,
        title: 'Quantum Mechanics Fundamentals',
        summary: 'Wave-particle duality, de Broglie hypothesis, Heisenberg uncertainty, and 1D Schrodinger wave equation.',
        hours: 8,
        topics: [
          {
            id: 'phy1-m1-t1',
            title: 'Wave-Particle Duality & Matter Waves',
            subtopics: [
              { id: 'st-phy1-1', title: 'de Broglie hypothesis and matter wave wavelength derivation', description: 'λ = h/p = h/√(2mE); wavelength of accelerated electrons.' },
              { id: 'st-phy1-2', title: 'Phase velocity and Group velocity relations', description: 'vp = ω/k and vg = dω/dk; proof of vg = vparticle.' },
              { id: 'st-phy1-3', title: "Heisenberg's Uncertainty Principle & Applications", description: 'Δx·Δp ≥ ℏ/2; non-existence of electron inside atomic nucleus.' }
            ]
          },
          {
            id: 'phy1-m1-t2',
            title: 'Schrodinger Wave Equation',
            subtopics: [
              { id: 'st-phy1-4', title: 'Time-Independent 1D Schrodinger Wave Equation derivation', description: 'Physical significance of wave function ψ and probability density |ψ|².' },
              { id: 'st-phy1-5', title: 'Particle in a 1D Infinite Potential Well (Rigid Box)', description: 'Eigenvalues En = (n²h²)/(8mL²) and normalized eigenfunctions.' }
            ]
          }
        ]
      },
      {
        id: 'phy1-m2',
        moduleNumber: 2,
        title: 'Lasers and Quantum Optics',
        summary: 'Absorption, spontaneous and stimulated emission, Einstein coefficients, population inversion, Ruby laser, He-Ne laser, and semiconductor lasers.',
        hours: 8,
        topics: [
          {
            id: 'phy1-m2-t1',
            title: 'Laser Principles & Einstein Relations',
            subtopics: [
              { id: 'st-phy1-6', title: 'Interaction of radiation with matter: Absorption, Spontaneous and Stimulated emission', description: 'Coherence, directionality, monochromaticity, and high intensity.' },
              { id: 'st-phy1-7', title: "Derivation of Einstein's A and B coefficients", description: 'Ratio of spontaneous to stimulated emission; conditions for light amplification.' },
              { id: 'st-phy1-8', title: 'Population inversion, Pumping schemes, and Metastable states', description: 'Three-level and four-level laser systems comparison.' }
            ]
          },
          {
            id: 'phy1-m2-t2',
            title: 'Engineering Laser Systems',
            subtopics: [
              { id: 'st-phy1-9', title: 'He-Ne Gas Laser: Construction, energy level diagram and 632.8 nm operation', description: 'Collision of first and second kind with helium atoms.' },
              { id: 'st-phy1-10', title: 'Semiconductor Diode Laser (GaAs): Working principle', description: 'Forward bias carrier injection and optical data storage applications.' }
            ]
          }
        ]
      },
      {
        id: 'phy1-m3',
        moduleNumber: 3,
        title: 'Optical Fibers & Optical Communication',
        summary: 'Total internal reflection, numerical aperture, acceptance angle, step-index and graded-index fibers, attenuation and dispersion.',
        hours: 8,
        topics: [
          {
            id: 'phy1-m3-t1',
            title: 'Propagation of Light in Optical Fibers',
            subtopics: [
              { id: 'st-phy1-11', title: 'Total Internal Reflection, Acceptance Angle and Numerical Aperture (NA) derivation', description: 'NA = √(n1² - n2²); fractional refractive index change.' },
              { id: 'st-phy1-12', title: 'Step-Index vs Graded-Index (GRIN) Optical Fibers', description: 'Ray trajectories, modal dispersion reduction, and V-number.' }
            ]
          },
          {
            id: 'phy1-m3-t2',
            title: 'Fiber Loss & Optical Sensor Applications',
            subtopics: [
              { id: 'st-phy1-13', title: 'Attenuation mechanisms: Absorption, Rayleigh scattering, Bending losses', description: 'Decibels per km loss calculation.' },
              { id: 'st-phy1-14', title: 'Fiber optic communication link and displacement/temperature sensor', description: 'Transmitter, fiber channel, photo-detector block diagram.' }
            ]
          }
        ]
      },
      {
        id: 'phy1-m4',
        moduleNumber: 4,
        title: 'Semiconductor Physics & Hall Effect',
        summary: 'Fermi-Dirac distribution, density of states, intrinsic and extrinsic carrier concentration, and Hall effect.',
        hours: 8,
        topics: [
          {
            id: 'phy1-m4-t1',
            title: 'Carrier Distribution in Semiconductors',
            subtopics: [
              { id: 'st-phy1-15', title: 'Fermi-Dirac distribution function f(E) and Fermi Energy EF', description: 'Effect of temperature on Fermi distribution in metals and semiconductors.' },
              { id: 'st-phy1-16', title: 'Intrinsic and Extrinsic carrier concentration equations', description: 'Law of mass action np = ni²; variation of Fermi level with doping.' }
            ]
          },
          {
            id: 'phy1-m4-t2',
            title: 'Hall Effect & Applications in Computing',
            subtopics: [
              { id: 'st-phy1-17', title: 'Hall Effect derivation: Hall Voltage VH and Hall Coefficient RH', description: 'Lorentz force balance on charge carriers in perpendicular magnetic field.' },
              { id: 'st-phy1-18', title: 'Applications of Hall Effect: Carrier type, mobility, magnetic field sensors', description: 'Determining p-type vs n-type and carrier mobility μ = σ·RH.' }
            ]
          }
        ]
      },
      {
        id: 'phy1-m5',
        moduleNumber: 5,
        title: 'Nanomaterials & Quantum Computing Basics',
        summary: 'Surface-to-volume ratio, quantum confinement (quantum dots, wires, wells), synthesis methods, and introduction to quantum bits (qubits).',
        hours: 8,
        topics: [
          {
            id: 'phy1-m5-t1',
            title: 'Nanomaterials & Quantum Confinement',
            subtopics: [
              { id: 'st-phy1-19', title: 'Classification of nanostructures: 0D (Quantum Dots), 1D (Wires), 2D (Wells)', description: 'Density of states variation with dimensionality.' },
              { id: 'st-phy1-20', title: 'Synthesis: Bottom-Up (Sol-Gel) and Top-Down (Ball Milling)', description: 'Mechanisms and carbon nanotubes (CNTs) properties.' }
            ]
          },
          {
            id: 'phy1-m5-t2',
            title: 'Quantum Bits & Modern Superconductivity',
            subtopics: [
              { id: 'st-phy1-21', title: 'Superconductivity: Meissner effect, Type-I and Type-II superconductors', description: 'Critical magnetic field, zero resistance and Cooper pairs.' },
              { id: 'st-phy1-22', title: 'Introduction to Quantum Information & Qubits', description: 'Superposition |ψ⟩ = α|0⟩ + β|1⟩, Bloch sphere representation and quantum gates.' }
            ]
          }
        ]
      }
    ]
  },

  {
    id: '1BEIT105',
    code: '1BEIT105',
    name: 'Programming in C',
    shortName: 'Programming in C (PIC)',
    semester: 1,
    credits: 3,
    category: 'Engineering Science',
    stream: 'CSE/AI-ML',
    description: 'Foundations of procedural programming in C, branching, looping, arrays, string manipulation, user-defined functions, recursion, structures, and pointers.',
    iconName: 'Code2',
    modules: [
      {
        id: 'pic1-m1',
        moduleNumber: 1,
        title: 'Introduction to C & Basic Input/Output',
        summary: 'Computer architecture essentials, algorithms, flowcharts, compilation process, tokens, data types, operators, and formatted I/O.',
        hours: 8,
        topics: [
          {
            id: 'pic1-m1-t1',
            title: 'Computational Problem Solving & C Program Structure',
            subtopics: [
              { id: 'st-pic1-1', title: 'Structure of a C program, compilation steps (Preprocessor -> Compiler -> Assembler -> Linker)', description: 'Header files, main function entry point, object code and executables.' },
              { id: 'st-pic1-2', title: 'Algorithms, Flowcharts with standard symbols, and Pseudo-code', description: 'Solving linear problems, checking prime numbers, Fibonacci sequence.' }
            ]
          },
          {
            id: 'pic1-m1-t2',
            title: 'Data Types, Operators & Expression Evaluation',
            subtopics: [
              { id: 'st-pic1-3', title: 'Keywords, Identifiers, Constants, and Primitive Data Types in C', description: 'int, float, double, char, range, signed/unsigned modifiers.' },
              { id: 'st-pic1-4', title: 'Operators, Precedence and Associativity rules', description: 'Arithmetic, relational, logical, bitwise, assignment, increment/decrement and ternary.' },
              { id: 'st-pic1-5', title: 'Formatted I/O (printf, scanf, format specifiers and escape sequences)', description: '%d, %f, %c, %s, width, precision, and buffer handling.' }
            ]
          }
        ]
      },
      {
        id: 'pic1-m2',
        moduleNumber: 2,
        title: 'Branching and Looping Control Structures',
        summary: 'if-else conditions, switch-case, while, do-while, for loops, nested loops, break, continue and goto.',
        hours: 8,
        topics: [
          {
            id: 'pic1-m2-t1',
            title: 'Conditional Branching Statements',
            subtopics: [
              { id: 'st-pic1-6', title: 'if, if-else, nested if-else, and else-if ladder', description: 'Roots of quadratic equation, leap year check, electricity bill calculation.' },
              { id: 'st-pic1-7', title: 'switch-case statement, break, and default handling', description: 'Simple arithmetic calculator, grade assignment menu-driven programs.' }
            ]
          },
          {
            id: 'pic1-m2-t2',
            title: 'Looping Iterative Statements',
            subtopics: [
              { id: 'st-pic1-8', title: 'while loop vs do-while loop (entry vs exit controlled)', description: 'Sum of digits, reversing integer, checking palindrome numbers.' },
              { id: 'st-pic1-9', title: 'for loop & nested loops for patterns and series', description: 'Generating multiplication tables, star pyramids, Pascal\'s triangle.' },
              { id: 'st-pic1-10', title: 'Jump statements: break, continue, and goto cautions', description: 'Exiting early from nested loops and skipping iterations.' }
            ]
          }
        ]
      },
      {
        id: 'pic1-m3',
        moduleNumber: 3,
        title: 'Arrays & String Operations',
        summary: '1D arrays, linear search, binary search, bubble sort, 2D arrays, matrix arithmetic, and string handling.',
        hours: 8,
        topics: [
          {
            id: 'pic1-m3-t1',
            title: 'Single and Multi-Dimensional Arrays',
            subtopics: [
              { id: 'st-pic1-11', title: 'Array declaration, initialization, and contiguous memory storage', description: 'Zero-based indexing, bounds checking, finding max/min elements.' },
              { id: 'st-pic1-12', title: 'Linear Search & Binary Search on 1D Arrays', description: 'Search algorithm flow, sorted precondition for binary search, Big-O comparison.' },
              { id: 'st-pic1-13', title: 'Bubble Sort algorithm implementation on 1D Array', description: 'Passes, adjacent comparisons, swap count, and sorted flag optimization.' },
              { id: 'st-pic1-14', title: '2D Arrays: Matrix Addition, Transpose, and Matrix Multiplication', description: 'Dimension compatibility condition (col1 == row2) and triple nested loops.' }
            ]
          },
          {
            id: 'pic1-m3-t2',
            title: 'String Manipulation & string.h Library',
            subtopics: [
              { id: 'st-pic1-15', title: 'Character arrays and null-terminator \\0 in C strings', description: 'Reading strings with scanf and fgets, buffer overflow risks.' },
              { id: 'st-pic1-16', title: 'Standard String library functions: strlen, strcpy, strcat, strcmp', description: 'Using string.h functions for string concatenation and comparison.' },
              { id: 'st-pic1-17', title: 'Custom string manipulation without using built-in functions', description: 'Manual string copy, string length, and checking palindrome strings.' }
            ]
          }
        ]
      },
      {
        id: 'pic1-m4',
        moduleNumber: 4,
        title: 'Functions, Scope & Recursion',
        summary: 'Function prototypes, parameter passing (call by value), recursion, and storage classes.',
        hours: 8,
        topics: [
          {
            id: 'pic1-m4-t1',
            title: 'Modular Programming with User-Defined Functions',
            subtopics: [
              { id: 'st-pic1-18', title: 'Function definition, declaration (prototype), and function call', description: 'Return types, actual vs formal parameters, void functions.' },
              { id: 'st-pic1-19', title: 'Parameter passing: Call by Value and passing 1D arrays to functions', description: 'Array decay to pointer and modifying array elements within function.' },
              { id: 'st-pic1-20', title: 'Storage Classes in C: auto, register, static, and extern', description: 'Scope, visibility, lifetime of variables, static counters.' }
            ]
          },
          {
            id: 'pic1-m4-t2',
            title: 'Recursive Functions',
            subtopics: [
              { id: 'st-pic1-21', title: 'Concept of Recursion, base case, and call stack trace', description: 'Tracing stack frames for factorial and Fibonacci computations.' },
              { id: 'st-pic1-22', title: 'Recursive algorithms: Factorial, GCD (Euclid algorithm), Tower of Hanoi', description: 'Recursion trees and time complexity implications.' }
            ]
          }
        ]
      },
      {
        id: 'pic1-m5',
        moduleNumber: 5,
        title: 'Structures, Unions & Pointers Introduction',
        summary: 'User-defined structures, array of structures, unions, pointer operators, and dynamic memory basics.',
        hours: 8,
        topics: [
          {
            id: 'pic1-m5-t1',
            title: 'Structures & Unions',
            subtopics: [
              { id: 'st-pic1-23', title: 'Defining struct, declaring variables, and dot (.) operator access', description: 'Student records (USN, name, marks) with struct.' },
              { id: 'st-pic1-24', title: 'Array of Structures & Nested Structures', description: 'Managing database of 100 students, calculating average marks.' },
              { id: 'st-pic1-25', title: 'Unions: Memory sharing concept vs Structures', description: 'Size of union equals largest member, saving memory in embedded contexts.' }
            ]
          },
          {
            id: 'pic1-m5-t2',
            title: 'Pointers & Dynamic Memory Introduction',
            subtopics: [
              { id: 'st-pic1-26', title: 'Pointer variable declaration, & (address-of) and * (dereference) operators', description: 'Direct memory addressing, NULL pointer, pointer arithmetic.' },
              { id: 'st-pic1-27', title: 'Call by Reference using pointers (Swapping numbers)', description: 'Simulating pass-by-reference in C using pointer arguments.' }
            ]
          }
        ]
      }
    ]
  },

  {
    id: '1BCEDS103',
    code: '1BCEDS103',
    name: 'Computer-Aided Engineering Drawing for CSE Stream',
    shortName: 'Computer-Aided Engg Drawing (CAED)',
    semester: 1,
    credits: 3,
    category: 'Engineering Science',
    stream: 'CSE/AI-ML',
    description: 'Engineering drawing fundamentals, orthographic projections of points, lines, planes, solids, and CAD software modeling for computer science engineers.',
    iconName: 'PenTool',
    modules: [
      {
        id: 'caed1-m1',
        moduleNumber: 1,
        title: 'CAD Software Basics & Projections of Points',
        summary: 'CAD GUI, drawing primitives, orthographic projection principles, quadrant systems, and projections of points in 4 quadrants.',
        hours: 8,
        topics: [
          {
            id: 'caed1-m1-t1',
            title: 'CAD Interface & Drafting Standards',
            subtopics: [
              { id: 'st-caed1-1', title: 'CAD software interface, commands, line types, dimensioning conventions (BIS standards)', description: 'Layers, grid, snap, trim, offset, title block layout.' },
              { id: 'st-caed1-2', title: 'Principles of Orthographic Projection & Reference planes (HP, VP, RPP, LPP)', description: 'First angle vs third angle projection systems.' }
            ]
          },
          {
            id: 'caed1-m1-t2',
            title: 'Projections of Points',
            subtopics: [
              { id: 'st-caed1-3', title: 'Projections of points located in I, II, III, and IV quadrants', description: 'Distance above/below HP, in front of/behind VP; identifying quadrant from projections.' },
              { id: 'st-caed1-4', title: 'Projections of points lying on reference planes', description: 'Points on HP, VP, or in profile plane.' }
            ]
          }
        ]
      },
      {
        id: 'caed1-m2',
        moduleNumber: 2,
        title: 'Projections of Straight Lines',
        summary: 'Lines parallel, perpendicular, and inclined to HP and VP; true length, apparent lengths, true inclinations (θ, φ) and apparent inclinations (α, β).',
        hours: 8,
        topics: [
          {
            id: 'caed1-m2-t1',
            title: 'Lines Inclined to One Reference Plane',
            subtopics: [
              { id: 'st-caed1-5', title: 'Line parallel to both planes, perpendicular to one plane', description: 'True length views and point views.' },
              { id: 'st-caed1-6', title: 'Line inclined to HP and parallel to VP (and vice versa)', description: 'Apparent lengths and true angle determination.' }
            ]
          },
          {
            id: 'caed1-m2-t2',
            title: 'Lines Inclined to Both Reference Planes',
            subtopics: [
              { id: 'st-caed1-7', title: 'Projection of line inclined to both HP and VP using Rotating Line method', description: 'Constructing loci of top view and front view endpoints.' },
              { id: 'st-caed1-8', title: 'Finding True Length (TL), True Inclinations (θ, φ) and Traces (HT, VT)', description: 'Solving VTU standard 15-mark line problems.' }
            ]
          }
        ]
      },
      {
        id: 'caed1-m3',
        moduleNumber: 3,
        title: 'Projections of Plane Surfaces (Lamina)',
        summary: 'Projections of triangular, square, rectangular, pentagonal, hexagonal, and circular planes inclined to both reference planes.',
        hours: 8,
        topics: [
          {
            id: 'caed1-m3-t1',
            title: 'Regular Polygonal Planes',
            subtopics: [
              { id: 'st-caed1-9', title: 'Triangular, Square, Rectangular, and Pentagonal planes resting on HP', description: 'Resting on edge vs resting on corner.' },
              { id: 'st-caed1-10', title: 'Three-stage projections: Surface inclination and edge/diagonal inclination', description: 'Corner resting condition and apparent inclination adjustments.' }
            ]
          },
          {
            id: 'caed1-m3-t2',
            title: 'Hexagonal & Circular Planes',
            subtopics: [
              { id: 'st-caed1-11', title: 'Hexagonal plane resting on edge/corner inclined to HP and VP', description: 'Projection steps with clear dimensioning.' },
              { id: 'st-caed1-12', title: 'Circular lamina: Apparent elliptical views in orthographic projections', description: '12-point division method for circular projections.' }
            ]
          }
        ]
      },
      {
        id: 'caed1-m4',
        moduleNumber: 4,
        title: 'Projections of Solids',
        summary: 'Projections of prisms, pyramids, cylinders, and cones resting on HP with axis inclined to both HP and VP.',
        hours: 8,
        topics: [
          {
            id: 'caed1-m4-t1',
            title: 'Prisms and Pyramids Projections',
            subtopics: [
              { id: 'st-caed1-13', title: 'Triangular, Square, Pentagonal, and Hexagonal Prisms resting on base', description: 'Axis inclined to HP and parallel to VP; visibility of edges.' },
              { id: 'st-caed1-14', title: 'Square and Hexagonal Pyramids resting on base corner or slant edge', description: 'Determining apex projection and drawing hidden boundary lines.' }
            ]
          },
          {
            id: 'caed1-m4-t2',
            title: 'Cylinders and Cones Projections',
            subtopics: [
              { id: 'st-caed1-15', title: 'Right circular cylinder with axis inclined to HP and VP', description: 'Constructing extreme generators and tangent lines.' },
              { id: 'st-caed1-16', title: 'Right circular cone resting on a generator on HP', description: 'Base ellipse projection and apex position tracing.' }
            ]
          }
        ]
      },
      {
        id: 'caed1-m5',
        moduleNumber: 5,
        title: 'Isometric Projections & 3D Modeling Overview',
        summary: 'Isometric scale, isometric view vs isometric projection of simple solids, truncated solids, and combination of solids.',
        hours: 8,
        topics: [
          {
            id: 'caed1-m5-t1',
            title: 'Isometric Scale & Isometric Views',
            subtopics: [
              { id: 'st-caed1-17', title: 'Construction of Isometric Scale (Isometric Length = 0.816 x True Length)', description: 'Isometric projection vs Isometric view differences.' },
              { id: 'st-caed1-18', title: 'Isometric projection of Prisms, Pyramids, Cylinders, and Cones', description: 'Box method and coordinate method for drawing isometric figures.' }
            ]
          },
          {
            id: 'caed1-m5-t2',
            title: 'Combination of Solids & 3D CAD Modeling',
            subtopics: [
              { id: 'st-caed1-19', title: 'Isometric projection of combined solids (e.g. cylinder over square prism)', description: 'Common central axis alignment and hidden part removal.' },
              { id: 'st-caed1-20', title: 'Introduction to 3D solid modeling in CAD (Extrude, Revolve, Sweep)', description: 'Creating 3D solids from 2D sketches in modern engineering CAD.' }
            ]
          }
        ]
      }
    ]
  },

  {
    id: '1BESC104A',
    code: '1BESC104A',
    name: 'Building Sciences and Mechanics',
    shortName: 'Building Sciences & Mechanics (BSM)',
    semester: 1,
    credits: 3,
    category: 'Engineering Science',
    stream: 'CSE/AI-ML',
    description: 'Engineering mechanics, coplanar force systems, centroid, moment of inertia, sustainable building materials, and structural elements.',
    iconName: 'Building2',
    modules: [
      {
        id: 'bsm1-m1',
        moduleNumber: 1,
        title: 'Concurrent Force Systems & Equilibrium',
        summary: 'Principles of statics, resolution and composition of forces, resultant of concurrent force systems, Varignon theorem, and Lami theorem.',
        hours: 8,
        topics: [
          {
            id: 'bsm1-m1-t1',
            title: 'Foundations of Statics & Force Systems',
            subtopics: [
              { id: 'st-bsm1-1', title: 'Introduction to Mechanics, idealization, Newton\'s laws of motion', description: 'Particle, rigid body, continuum concepts.' },
              { id: 'st-bsm1-2', title: 'Classification of force systems, principle of transmissibility of forces', description: 'Concurrent, non-concurrent, parallel, coplanar systems.' },
              { id: 'st-bsm1-3', title: 'Resolution and Composition of Coplanar Concurrent Forces', description: 'Computing resultant magnitude R = √(ΣFx² + ΣFy²) and direction tan θ.' }
            ]
          },
          {
            id: 'bsm1-m1-t2',
            title: 'Equilibrium & Lami\'s Theorem',
            subtopics: [
              { id: 'st-bsm1-4', title: 'Free Body Diagrams (FBD) and conditions of static equilibrium', description: 'Isolating bodies, reaction forces at supports, roller/hinge/fixed.' },
              { id: 'st-bsm1-5', title: "Lami's Theorem for three coplanar concurrent forces in equilibrium", description: 'P/sin α = Q/sin β = R/sin γ applications to suspended strings and cylinders.' }
            ]
          }
        ]
      },
      {
        id: 'bsm1-m2',
        moduleNumber: 2,
        title: 'Non-Concurrent Force Systems & Support Reactions',
        summary: 'Moment of a force, couple, Varignon theorem, resultant of non-concurrent systems, types of beams, and support reaction computations.',
        hours: 8,
        topics: [
          {
            id: 'bsm1-m2-t1',
            title: 'Moment, Couple & Varignon\'s Theorem',
            subtopics: [
              { id: 'st-bsm1-6', title: 'Moment of a force about a point, couple and characteristics of couple', description: 'Clockwise vs anticlockwise moments, moment vector.' },
              { id: 'st-bsm1-7', title: "Varignon's Theorem of Moments derivation and proof", description: 'Moment of resultant equals sum of moments of individual components.' },
              { id: 'st-bsm1-8', title: 'Resultant of Coplanar Non-Concurrent Force Systems', description: 'Locating line of action of resultant using Varignon\'s theorem.' }
            ]
          },
          {
            id: 'bsm1-m2-t2',
            title: 'Beams & Support Reactions',
            subtopics: [
              { id: 'st-bsm1-9', title: 'Classification of beams and types of loadings (Point load, UDL, UVL)', description: 'Simply supported, cantilever, overhanging, continuous beams.' },
              { id: 'st-bsm1-10', title: 'Determination of Support Reactions for simply supported and overhanging beams', description: 'Applying ΣFx = 0, ΣFy = 0, ΣM = 0 to calculate reactions.' }
            ]
          }
        ]
      },
      {
        id: 'bsm1-m3',
        moduleNumber: 3,
        title: 'Centroid & Moment of Inertia of Plane Areas',
        summary: 'Centroid of basic figures and composite sections, parallel axis theorem, perpendicular axis theorem, and radius of gyration.',
        hours: 8,
        topics: [
          {
            id: 'bsm1-m3-t1',
            title: 'Centroid of Composite Laminas',
            subtopics: [
              { id: 'st-bsm1-11', title: 'Centroid of simple geometric figures (Rectangle, Triangle, Circle, Semicircle)', description: 'Derivation using first moment of area ∫x dA.' },
              { id: 'st-bsm1-12', title: 'Centroid of composite sections: T-section, I-section, L-section, Channel section', description: 'Formulas X̄ = Σ(Ai·xi)/ΣAi and Ȳ = Σ(Ai·yi)/ΣAi.' }
            ]
          },
          {
            id: 'bsm1-m3-t2',
            title: 'Moment of Inertia (Second Moment of Area)',
            subtopics: [
              { id: 'st-bsm1-13', title: 'Parallel Axis Theorem (Ixx = IG + Ah²) and Perpendicular Axis Theorem', description: 'Proofs and significance in structural resistance to bending.' },
              { id: 'st-bsm1-14', title: 'Moment of inertia and radius of gyration of composite sections (T, I, Channel)', description: 'Solving symmetric and asymmetric structural cross-sections.' }
            ]
          }
        ]
      },
      {
        id: 'bsm1-m4',
        moduleNumber: 4,
        title: 'Building Materials & Sustainable Construction',
        summary: 'Cement, concrete, aggregates, steel, bricks, eco-friendly green building materials, and smart materials.',
        hours: 8,
        topics: [
          {
            id: 'bsm1-m4-t1',
            title: 'Traditional Construction Materials',
            subtopics: [
              { id: 'st-bsm1-15', title: 'Portland Cement: Manufacturing process, hydration, grades and initial/final setting time', description: 'Bogue\'s compounds (C3S, C2S, C3A, C4AF) role in strength.' },
              { id: 'st-bsm1-16', title: 'Concrete: Water-cement ratio, workability (Slump test), compressive strength testing', description: 'M20, M25 mix proportions and 28-day curing curve.' },
              { id: 'st-bsm1-17', title: 'Structural Steel and TMT bars: Mechanical properties and stress-strain curve', description: 'Yield point, ultimate tensile strength, elongation and corrosion resistance.' }
            ]
          },
          {
            id: 'bsm1-m4-t2',
            title: 'Sustainable & Smart Materials',
            subtopics: [
              { id: 'st-bsm1-18', title: 'Eco-friendly materials: Fly ash, GGBS, Recycled aggregates, Stabilized mud blocks', description: 'Carbon footprint reduction and energy efficiency.' },
              { id: 'st-bsm1-19', title: 'Green building concepts, IGBC rating system, and energy audit basics', description: 'Daylighting, rainwater harvesting, thermal insulation in IT parks.' }
            ]
          }
        ]
      },
      {
        id: 'bsm1-m5',
        moduleNumber: 5,
        title: 'Basic Structural Components & Smart Buildings',
        summary: 'Substructure (foundations), Superstructure (columns, beams, slabs, walls), smart building sensors, IoT in civil infrastructure.',
        hours: 8,
        topics: [
          {
            id: 'bsm1-m5-t1',
            title: 'Structural Elements & Building Load Path',
            subtopics: [
              { id: 'st-bsm1-20', title: 'Substructure: Shallow foundations (Isolated, Combined, Raft) vs Deep foundations (Piles)', description: 'Soil bearing capacity and load transfer to bed stratum.' },
              { id: 'st-bsm1-21', title: 'Superstructure elements: RCC Columns, Beams, Slabs, and Load bearing walls', description: 'Tension reinforcement, compression zones, span-to-depth ratios.' }
            ]
          },
          {
            id: 'bsm1-m5-t2',
            title: 'Smart Buildings & Sensor Automation',
            subtopics: [
              { id: 'st-bsm1-22', title: 'Structural Health Monitoring (SHM) using strain gauges and piezoelectric sensors', description: 'Vibration monitoring, bridge inspection, crack detection with IoT.' },
              { id: 'st-bsm1-23', title: 'Building Management Systems (BMS): HVAC automation, fire safety, and energy monitoring', description: 'Smart infrastructure for modern technology campuses.' }
            ]
          }
        ]
      }
    ]
  },

  {
    id: '1BSKS106',
    code: '1BSKS106',
    name: 'Soft Skills',
    shortName: 'Soft Skills (SS)',
    semester: 1,
    credits: 1,
    category: 'Skill Oriented',
    stream: 'CSE/AI-ML',
    description: 'Interpersonal communication, active listening, public speaking, group discussions, email etiquette, resume drafting, and emotional intelligence for engineering careers.',
    iconName: 'Users',
    modules: [
      {
        id: 'ss1-m1',
        moduleNumber: 1,
        title: 'Foundations of Communication & Active Listening',
        summary: 'Communication cycle, verbal vs non-verbal communication, body language, barriers to communication, and listening skills.',
        hours: 4,
        topics: [
          {
            id: 'ss1-m1-t1',
            title: 'Communication Process & Barriers',
            subtopics: [
              { id: 'st-ss1-1', title: '7 Cs of Effective Communication (Clear, Concise, Concrete, Correct, Coherent, Complete, Courteous)', description: 'Application in academic presentations and corporate engineering.' },
              { id: 'st-ss1-2', title: 'Non-verbal communication: Kinesics, Proxemics, Paralanguage, and Eye contact', description: 'Reading body language and projecting professional confidence.' },
              { id: 'st-ss1-3', title: 'Active Listening vs Passive Hearing & Overcoming psychological/environmental barriers', description: 'Reflective listening, note taking, and feedback loops.' }
            ]
          }
        ]
      },
      {
        id: 'ss1-m2',
        moduleNumber: 2,
        title: 'Public Speaking, Presentations & Group Discussions',
        summary: 'Overcoming stage fright, organizing speech content, visual aids usage, and GD techniques.',
        hours: 4,
        topics: [
          {
            id: 'ss1-m2-t1',
            title: 'Presentation Skills & Group Discussions',
            subtopics: [
              { id: 'st-ss1-4', title: 'Overcoming Glossophobia (stage fright) and structuring talks (Hook, Body, Conclusion)', description: 'Vocal modulation, pitch variation, pacing.' },
              { id: 'st-ss1-5', title: 'Group Discussion dynamics: Initiation, moderation, summarization, and consensus building', description: 'Dos and Don\'ts in placement GDs.' }
            ]
          }
        ]
      },
      {
        id: 'ss1-m3',
        moduleNumber: 3,
        title: 'Professional Writing, Resume & Email Etiquette',
        summary: 'Formal email drafting, professional resume design, cover letters, and LinkedIn profile building.',
        hours: 4,
        topics: [
          {
            id: 'ss1-m3-t1',
            title: 'Career Communication Artifacts',
            subtopics: [
              { id: 'st-ss1-6', title: 'Email etiquette: Subject lines, salutations, formal tone, attachments protocol', description: 'Writing to professors, project guides, and corporate recruiters.' },
              { id: 'st-ss1-7', title: 'Resume crafting: Chronological vs Functional formats, action verbs, project highlights', description: 'ATS compliance, GitHub profile inclusion, technical skills organization.' }
            ]
          }
        ]
      }
    ]
  },

  {
    id: '1BPOPL107',
    code: '1BPOPL107',
    name: 'C Programming Lab',
    shortName: 'C Programming Lab (CP Lab)',
    semester: 1,
    credits: 1,
    category: 'Laboratory',
    stream: 'CSE/AI-ML',
    description: 'Hands-on programming laboratory covering 12 VTU prescribed C exercises on Linux/GCC: quadratic roots, calculator, electricity billing, binary search, bubble sort, matrices, and structs.',
    iconName: 'Terminal',
    modules: [
      {
        id: 'cpl1-m1',
        moduleNumber: 1,
        title: 'VTU Prescribed Lab Experiments - Cycle 1 (Conditionals & Loops)',
        summary: 'Basic arithmetic, roots of quadratic equation, menu-driven calculator, and electricity billing calculation.',
        hours: 6,
        topics: [
          {
            id: 'cpl1-m1-t1',
            title: 'Prescribed Programs 1 - 4',
            subtopics: [
              { id: 'st-cpl1-1', title: 'Program 1: Simulation of a Simple Calculator using switch-case', description: 'Reading operands and operator (+, -, *, /, %), handling division by zero.' },
              { id: 'st-cpl1-2', title: 'Program 2: Finding roots of Quadratic Equation (ax² + bx + c = 0)', description: 'Real and equal, real and distinct, and complex imaginary roots using discriminant d.' },
              { id: 'st-cpl1-3', title: 'Program 3: Electricity bill calculation with slabs and surcharge', description: 'Multi-tier tariff structure and meter charges calculation.' },
              { id: 'st-cpl1-4', title: 'Program 4: Reversing an integer and checking for Palindrome', description: 'Modulo 10 extraction, building reversed number, checking equality.' }
            ]
          }
        ]
      },
      {
        id: 'cpl1-m2',
        moduleNumber: 2,
        title: 'VTU Prescribed Lab Experiments - Cycle 2 (Arrays, Search & Sort)',
        summary: 'Linear and binary search, bubble sort, and matrix multiplication experiments.',
        hours: 6,
        topics: [
          {
            id: 'cpl1-m2-t1',
            title: 'Prescribed Programs 5 - 8',
            subtopics: [
              { id: 'st-cpl1-5', title: 'Program 5: Binary Search on sorted 1D array of integers', description: 'Low, high, mid calculation and key position output.' },
              { id: 'st-cpl1-6', title: 'Program 6: Sorting N integers using Bubble Sort algorithm', description: 'Tracing array elements after each pass.' },
              { id: 'st-cpl1-7', title: 'Program 7: Matrix Multiplication of two matrices A(m x n) and B(p x q)', description: 'Checking n == p condition, initialization of result matrix to 0, computation.' },
              { id: 'st-cpl1-8', title: 'Program 8: Taylor Series approximation of sin(x) and cos(x)', description: 'Term = -term * x² / (2i * (2i+1)) iterative loop without pow() or fact().' }
            ]
          }
        ]
      },
      {
        id: 'cpl1-m3',
        moduleNumber: 3,
        title: 'VTU Prescribed Lab Experiments - Cycle 3 (Strings, Functions & Structs)',
        summary: 'String operations without library functions, recursion, and student records with structures.',
        hours: 6,
        topics: [
          {
            id: 'cpl1-m3-t1',
            title: 'Prescribed Programs 9 - 12',
            subtopics: [
              { id: 'st-cpl1-9', title: 'Program 9: String copy, string length, and string comparison without string.h', description: 'Pointer or array indexing loop terminating at null character \\0.' },
              { id: 'st-cpl1-10', title: 'Program 10: Recursive computation of Factorial and GCD of two integers', description: 'Euclid\'s division lemma recursive implementation.' },
              { id: 'st-cpl1-11', title: 'Program 11: Array of Structures for N student records and computing average marks', description: 'USN, student name, marks in 3 tests, finding student scoring highest marks.' },
              { id: 'st-cpl1-12', title: 'Program 12: Pointers for swapping two variables and array processing', description: 'Demonstrating call-by-reference in C functions.' }
            ]
          }
        ]
      }
    ]
  },

  {
    id: '1BIDTL158',
    code: '1BIDTL158',
    name: 'Innovation and Design Thinking Lab',
    shortName: 'Innovation & Design Thinking Lab (IDTL)',
    semester: 1,
    credits: 1,
    category: 'Skill Oriented',
    stream: 'CSE/AI-ML',
    description: 'Design thinking methodology, empathy mapping, problem definition, ideation, prototyping, testing, intellectual property rights, and engineering patents.',
    iconName: 'Lightbulb',
    modules: [
      {
        id: 'idt1-m1',
        moduleNumber: 1,
        title: 'Design Thinking Process: Empathize & Define',
        summary: 'Human-centered design, stakeholder interviews, user persona creation, empathy maps, and point-of-view (POV) problem statements.',
        hours: 4,
        topics: [
          {
            id: 'idt1-m1-t1',
            title: 'Empathy & User-Centric Research',
            subtopics: [
              { id: 'st-idt1-1', title: '5 Stages of Design Thinking (Empathize, Define, Ideate, Prototype, Test)', description: 'Non-linear, iterative human-centered problem solving cycle.' },
              { id: 'st-idt1-2', title: 'Empathy Mapping: Says, Thinks, Does, Feels quadrant analysis', description: 'Identifying user pain points and hidden unarticulated needs.' },
              { id: 'st-idt1-3', title: 'Formulating "How Might We" (HMW) problem definition statements', description: 'Reframing challenges into actionable creative opportunities.' }
            ]
          }
        ]
      },
      {
        id: 'idt1-m2',
        moduleNumber: 2,
        title: 'Ideation, SCAMPER & Low-Fidelity Prototyping',
        summary: 'Brainstorming techniques, SCAMPER framework, rapid paper prototyping, digital wireframing, and user testing feedback.',
        hours: 4,
        topics: [
          {
            id: 'idt1-m2-t1',
            title: 'Ideate & Rapid Prototype',
            subtopics: [
              { id: 'st-idt1-4', title: 'Ideation techniques: SCAMPER (Substitute, Combine, Adapt, Modify, Put to other use, Eliminate, Reverse)', description: 'Generating 50+ divergent solution ideas.' },
              { id: 'st-idt1-5', title: 'Low-Fidelity paper prototypes vs High-Fidelity interactive mockups', description: 'Figma wireframes, physical cardboard models, test user feedback capture grid.' },
              { id: 'st-idt1-6', title: 'Introduction to Patents, Copyrights, Trademarks, and IPR filing in India', description: 'Patent novelty search, provisional vs complete patent specification.' }
            ]
          }
        ]
      }
    ]
  },

  {
    id: '1BKSK109',
    code: '1BKSK/BK109',
    name: 'Samskrutika Kannada (SK) / Balake Kannada (BK)',
    shortName: 'Kannada (SK / BK)',
    semester: 1,
    credits: 1,
    category: 'Humanities & Social Sciences',
    stream: 'CSE/AI-ML',
    description: 'Mandatory VTU regional language course: Samskrutika Kannada for Kannada-speaking students (literature, heritage, science in Kannada) or Balake Kannada for non-Kannada speakers (functional conversation, college vocabulary).',
    iconName: 'BookOpen',
    modules: [
      {
        id: 'kan1-m1',
        moduleNumber: 1,
        title: 'Balake Kannada: Functional Communication & Grammar',
        summary: 'Basic Kannada alphabets, greetings, interrogatives, nouns, verbs, numbers, directions, and conversational Kannada for college environment.',
        hours: 4,
        topics: [
          {
            id: 'kan1-m1-t1',
            title: 'Essential Spoken Kannada for Engineers',
            subtopics: [
              { id: 'st-kan1-1', title: 'Namaskara, Greetings, Self-introduction and Polite inquiry phrases in Kannada', description: 'Conversing with college staff, auto drivers, shopkeepers and peers.' },
              { id: 'st-kan1-2', title: 'Interrogative words (Yaru, Yenu, Yelli, Yavaga, Hega) and Pronouns', description: 'Asking questions, classroom requests and basic grammar rules.' },
              { id: 'st-kan1-3', title: 'Numbers (Ondu to Nooru), Days of week, Directions, and Time in Kannada', description: 'Everyday vocabulary for engineering students staying in Karnataka.' }
            ]
          }
        ]
      },
      {
        id: 'kan1-m2',
        moduleNumber: 2,
        title: 'Samskrutika Kannada: Karnataka Heritage & Literature',
        summary: 'Vachana sahitya, Sir M. Visvesvaraya biography, Karnataka history, and technical Kannada development.',
        hours: 4,
        topics: [
          {
            id: 'kan1-m2-t1',
            title: 'Heritage & Visionary Contributions',
            subtopics: [
              { id: 'st-kan1-4', title: 'Sir M. Visvesvaraya: Life, engineering visionary achievements, KRS dam, and ethics', description: 'Inspiration for VTU engineers and Karnataka industrialization.' },
              { id: 'st-kan1-5', title: 'Vachana Sahitya overview: Basaveshwara, Allama Prabhu, Akka Mahadevi philosophy', description: 'Work is Worship (Kayakave Kailasa) work ethic in modern profession.' }
            ]
          }
        ]
      }
    ]
  },

  // ==========================================
  // SEMESTER 2 (Chemistry Group - 2025-2026 Scheme)
  // For CSE-A, CSE-B, AI/ML
  // ==========================================
  {
    id: '1BMATS201',
    code: '1BMATS201',
    name: 'Advanced Calculus and Numerical Methods',
    shortName: 'Advanced Calculus & Numerical (MAT-II)',
    semester: 2,
    credits: 4,
    category: 'Basic Science',
    stream: 'CSE/AI-ML',
    description: 'Higher-order linear differential equations, Laplace transforms, inverse Laplace, vector calculus, double and triple integrals, and numerical root finding.',
    iconName: 'Calculator',
    modules: [
      {
        id: 'mat2-m1',
        moduleNumber: 1,
        title: 'Higher Order Linear Differential Equations',
        summary: 'Homogeneous and non-homogeneous linear ODEs with constant coefficients, inverse differential operator method, and method of variation of parameters.',
        hours: 8,
        topics: [
          {
            id: 'mat2-m1-t1',
            title: 'Linear ODEs with Constant Coefficients',
            subtopics: [
              { id: 'st-mat2-1', title: 'Complementary Function (CF) calculation for auxiliary roots', description: 'Distinct real, repeated real, and complex conjugate root cases.' },
              { id: 'st-mat2-2', title: 'Particular Integral (PI) for RHS e^ax, sin(ax), cos(ax), x^m, and e^ax·V', description: 'Inverse D-operator shortcuts and failure case handling.' }
            ]
          },
          {
            id: 'mat2-m1-t2',
            title: 'Variation of Parameters & Cauchy-Euler Equations',
            subtopics: [
              { id: 'st-mat2-3', title: 'Method of Variation of Parameters for y" + Py\' + Qy = R', description: 'Wronskian determinant W and finding PI = u·y1 + v·y2.' },
              { id: 'st-mat2-4', title: "Cauchy-Euler & Legendre's Homogeneous Linear Differential Equations", description: 'Transformation x = e^z and reduction to constant coefficient ODEs.' }
            ]
          }
        ]
      },
      {
        id: 'mat2-m2',
        moduleNumber: 2,
        title: 'Laplace & Inverse Laplace Transforms',
        summary: 'Definition of Laplace transform, linearity, first shifting theorem, transforms of derivatives and integrals, unit step function, Dirac delta, and solving IVPs.',
        hours: 8,
        topics: [
          {
            id: 'mat2-m2-t1',
            title: 'Laplace Transforms of Standard Functions',
            subtopics: [
              { id: 'st-mat2-5', title: 'Laplace transforms of 1, t^n, e^at, sin(at), cos(at), sinh(at), cosh(at)', description: 'Proof from integral definition ∫0^∞ e^-st f(t) dt.' },
              { id: 'st-mat2-6', title: 'Properties: First shifting theorem, multiplication by t^n, division by t', description: 'Transform of derivative L{f\'(t)} = sF(s) - f(0).' }
            ]
          },
          {
            id: 'mat2-m2-t2',
            title: 'Inverse Laplace & ODE Solving',
            subtopics: [
              { id: 'st-mat2-7', title: 'Inverse Laplace transform using Partial Fractions and Convolution theorem', description: 'Convolution integral ∫0^t f(u) g(t-u) du.' },
              { id: 'st-mat2-8', title: 'Solving linear differential equations with initial conditions using Laplace transforms', description: 'Application to spring-mass dampers and electrical circuits.' }
            ]
          }
        ]
      },
      {
        id: 'mat2-m3',
        moduleNumber: 3,
        title: 'Multiple Integrals & Applications',
        summary: 'Double integrals in Cartesian and polar coordinates, change of order of integration, triple integrals, and volume calculation.',
        hours: 8,
        topics: [
          {
            id: 'mat2-m3-t1',
            title: 'Double Integrals & Change of Order',
            subtopics: [
              { id: 'st-mat2-9', title: 'Evaluation of double integrals over rectangular and general domains', description: 'Iterated integrals and region sketches.' },
              { id: 'st-mat2-10', title: 'Change of Order of Integration in double integrals', description: 'Sketching boundaries, changing horizontal strip to vertical strip.' },
              { id: 'st-mat2-11', title: 'Double integrals in polar coordinates & Area computation', description: 'Jacobian r dr dθ and area of cardioids and circles.' }
            ]
          },
          {
            id: 'mat2-m3-t2',
            title: 'Triple Integrals & Volume Evaluation',
            subtopics: [
              { id: 'st-mat2-12', title: 'Evaluation of triple integrals in Cartesian coordinates', description: 'Volume of tetrahedrons, spheres, and cylinders.' }
            ]
          }
        ]
      },
      {
        id: 'mat2-m4',
        moduleNumber: 4,
        title: 'Vector Calculus: Gradient, Divergence, Curl',
        summary: 'Scalar and vector fields, directional derivative, gradient, divergence, curl, solenoidal and irrotational fields, vector identities.',
        hours: 8,
        topics: [
          {
            id: 'mat2-m4-t1',
            title: 'Differential Vector Operations',
            subtopics: [
              { id: 'st-mat2-13', title: 'Gradient of a scalar field and Directional Derivative', description: 'grad φ = ∇φ; maximum rate of increase along unit normal n̂.' },
              { id: 'st-mat2-14', title: 'Divergence and Curl of a vector field', description: 'div F = ∇·F and curl F = ∇ x F; physical interpretation in fluid flow.' },
              { id: 'st-mat2-15', title: 'Solenoidal (div F = 0) and Irrotational (curl F = 0) vector fields', description: 'Finding scalar potential φ such that F = ∇φ.' }
            ]
          }
        ]
      },
      {
        id: 'mat2-m5',
        moduleNumber: 5,
        title: 'Numerical Methods for Root Finding & Interpolation',
        summary: 'Regula-Falsi, Newton-Raphson method, Newton forward and backward interpolation, Lagrange interpolation.',
        hours: 8,
        topics: [
          {
            id: 'mat2-m5-t1',
            title: 'Numerical Solution of Algebraic & Transcendental Equations',
            subtopics: [
              { id: 'st-mat2-16', title: 'Regula-Falsi (False Position) method convergence', description: 'Formula x = (a f(b) - b f(a)) / (f(b) - f(a)) iterative roots.' },
              { id: 'st-mat2-17', title: 'Newton-Raphson method: Formula x_{n+1} = x_n - f(x_n)/f\'(x_n)', description: 'Quadratic convergence and stopping criteria.' }
            ]
          },
          {
            id: 'mat2-m5-t2',
            title: 'Interpolation Polynomials',
            subtopics: [
              { id: 'st-mat2-18', title: 'Newton Forward and Backward Difference Interpolation', description: 'Difference tables Δ and ∇ for equally spaced data.' },
              { id: 'st-mat2-19', title: "Lagrange's Interpolation formula for unequally spaced data", description: 'Constructing interpolation polynomial for arbitrary points.' }
            ]
          }
        ]
      }
    ]
  },

  {
    id: '1BCHEM202',
    code: '1BCHEM202',
    name: 'Applied Chemistry for CSE Stream',
    shortName: 'Applied Chemistry (CHEM)',
    semester: 2,
    credits: 4,
    category: 'Basic Science',
    stream: 'CSE/AI-ML',
    description: 'Electrochemical energy storage, lithium-ion batteries, corrosion science, polymer electronic materials, displays, OLEDs, sensors, and water treatment.',
    iconName: 'FlaskConical',
    modules: [
      {
        id: 'chem2-m1',
        moduleNumber: 1,
        title: 'Electrochemical Energy Systems & Batteries',
        summary: 'Galvanic cells, Nernst equation, lithium-ion battery technology, supercapacitors, and fuel cells for electronic devices.',
        hours: 8,
        topics: [
          {
            id: 'chem2-m1-t1',
            title: 'Electrode Potentials & Batteries',
            subtopics: [
              { id: 'st-ch2-1', title: 'Nernst equation derivation for single electrode potential', description: 'E = E0 - (0.0591/n) log(1/[Mn+]) at 298K.' },
              { id: 'st-ch2-2', title: 'Lithium-ion Battery: Chemistry, LiCoO2 cathode, graphite anode, charge cycles', description: 'Working mechanism in laptops, smartphones, and EVs.' },
              { id: 'st-ch2-3', title: 'Supercapacitors vs Batteries comparison in energy density', description: 'Electric double-layer capacitors (EDLC) in computing systems.' }
            ]
          }
        ]
      },
      {
        id: 'chem2-m2',
        moduleNumber: 2,
        title: 'Corrosion Science & PCB Fabrication',
        summary: 'Electrochemical corrosion theory, differential aeration, galvanic corrosion, PCB etching, and electroless copper plating.',
        hours: 8,
        topics: [
          {
            id: 'chem2-m2-t1',
            title: 'Corrosion Mechanisms & Electronic Plating',
            subtopics: [
              { id: 'st-ch2-4', title: 'Electrochemical theory of corrosion (H2 evolution and O2 absorption)', description: 'Anodic oxidation and cathodic reduction kinetics.' },
              { id: 'st-ch2-5', title: 'Electroless plating of Copper on printed circuit boards (PCBs)', description: 'Autocatalytic plating of micro vias on glass epoxy boards.' }
            ]
          }
        ]
      },
      {
        id: 'chem2-m3',
        moduleNumber: 3,
        title: 'Electronic Polymers & Display Materials',
        summary: 'Conducting polymers, polyaniline, OLEDs, liquid crystal displays (LCDs), and semiconductor photoresists for VLSI.',
        hours: 8,
        topics: [
          {
            id: 'chem2-m3-t1',
            title: 'Conducting Polymers & Displays',
            subtopics: [
              { id: 'st-ch2-6', title: 'Synthesis and conduction mechanism of Polyaniline (PANI)', description: 'p-doping and n-doping mechanisms, flexible electronics.' },
              { id: 'st-ch2-7', title: 'OLED (Organic Light Emitting Diode): Working principle and emissive polymers', description: 'Electroluminescence in high-resolution smartphone screens.' },
              { id: 'st-ch2-8', title: 'Liquid Crystals and LCD operation with polarizing filters', description: 'Twisted nematic (TN) cell switching voltage.' }
            ]
          }
        ]
      },
      {
        id: 'chem2-m4',
        moduleNumber: 4,
        title: 'Water Technology & Environmental Engineering',
        summary: 'Hardness of water, EDTA titration, Reverse Osmosis (RO) desalination, and electronic waste (e-waste) management.',
        hours: 8,
        topics: [
          {
            id: 'chem2-m4-t1',
            title: 'Water Purification & E-Waste Management',
            subtopics: [
              { id: 'st-ch2-9', title: 'Determination of hardness by complexometric EDTA method', description: 'EBT indicator, buffer pH 10, CaCO3 equivalent calculations.' },
              { id: 'st-ch2-10', title: 'Desalination of seawater by Reverse Osmosis (RO) membranes', description: 'Cellulose acetate semipermeable membrane and osmotic pressure.' },
              { id: 'st-ch2-11', title: 'E-Waste management: Toxic heavy metals (Pb, Hg, Cd) and recycling standards', description: 'Safe recovery of gold and copper from discarded server hardware.' }
            ]
          }
        ]
      },
      {
        id: 'chem2-m5',
        moduleNumber: 5,
        title: 'Sensors & Instrumental Chemical Analysis',
        summary: 'Electrochemical sensors, pH sensors, conductometric titration, potentiometric titration, and UV-Visible spectrophotometry.',
        hours: 8,
        topics: [
          {
            id: 'chem2-m5-t1',
            title: 'Chemical Sensor Transducers',
            subtopics: [
              { id: 'st-ch2-12', title: 'Conductometric titration: Strong acid vs strong base and weak acid vs strong base', description: 'Conductance curves and equivalence point detection.' },
              { id: 'st-ch2-13', title: "Colorimetry: Beer-Lambert's law and estimation of copper in alloys", description: 'A = ε c l, spectrophotometer calibration curve.' }
            ]
          }
        ]
      }
    ]
  },

  {
    id: '1BEIT204',
    code: '1BEIT204',
    name: 'Python Programming for Problem Solving',
    shortName: 'Python Programming (PYTHON)',
    semester: 2,
    credits: 3,
    category: 'Engineering Science',
    stream: 'CSE/AI-ML',
    description: 'Python fundamentals, data types, lists, tuples, dictionaries, sets, functions, file handling, object-oriented programming (OOP), and exception handling.',
    iconName: 'FileCode2',
    modules: [
      {
        id: 'py2-m1',
        moduleNumber: 1,
        title: 'Python Syntax, Variables & Control Flow',
        summary: 'Python interactive interpreter, dynamic typing, operators, if-elif-else conditionals, for loops, while loops, and list comprehensions.',
        hours: 8,
        topics: [
          {
            id: 'py2-m1-t1',
            title: 'Core Python & Control Flow',
            subtopics: [
              { id: 'st-py2-1', title: 'Python installation, indentation rule, variables, and dynamic data types', description: 'int, float, complex, str, bool, type casting.' },
              { id: 'st-py2-2', title: 'Operators, print(f-strings), input(), and mathematical expressions', description: 'Arithmetic, comparison, logical, membership (in, not in), identity (is, is not).' },
              { id: 'st-py2-3', title: 'Decision making: if, if-elif-else, and conditional ternary expressions', description: 'Nested conditions and boolean logic.' },
              { id: 'st-py2-4', title: 'Loops: while loop, for loop with range(), and break/continue/pass', description: 'Loop else clauses and prime number verification.' }
            ]
          }
        ]
      },
      {
        id: 'py2-m2',
        moduleNumber: 2,
        title: 'Data Structures: Lists, Tuples & Slicing',
        summary: 'List methods, indexing, negative slicing, nested lists, list comprehensions, immutability of tuples, and tuple packing/unpacking.',
        hours: 8,
        topics: [
          {
            id: 'py2-m2-t1',
            title: 'Lists & Tuples',
            subtopics: [
              { id: 'st-py2-5', title: 'List operations: append(), extend(), insert(), pop(), remove(), sort()', description: 'In-place modifications vs copies.' },
              { id: 'st-py2-6', title: 'Slicing syntax [start:stop:step] and reverse slicing [::-1]', description: 'Extracting sub-sequences and palindrome checks.' },
              { id: 'st-py2-7', title: 'List Comprehensions with filtering conditions [x for x in seq if cond]', description: 'Concise array generation and matrix flattening.' },
              { id: 'st-py2-8', title: 'Tuples: Immutability, single element tuple comma rule, and tuple unpacking', description: 'Returning multiple values from functions.' }
            ]
          }
        ]
      },
      {
        id: 'py2-m3',
        moduleNumber: 3,
        title: 'Dictionaries, Sets & Functions',
        summary: 'Dictionary key-value pairs, hashable keys, set operations, user-defined functions, *args, **kwargs, and lambda functions.',
        hours: 8,
        topics: [
          {
            id: 'py2-m3-t1',
            title: 'Dictionaries & Sets',
            subtopics: [
              { id: 'st-py2-9', title: 'Dictionary methods: get(), keys(), values(), items(), update()', description: 'Word frequency count and JSON-like record mapping.' },
              { id: 'st-py2-10', title: 'Sets: Unique elements, union (|), intersection (&), difference (-)', description: 'Removing duplicates and set comprehension.' }
            ]
          },
          {
            id: 'py2-m3-t2',
            title: 'Functions & Lambda Expressions',
            subtopics: [
              { id: 'st-py2-11', title: 'def statement, default arguments, keyword arguments, *args and **kwargs', description: 'Variable-length argument functions.' },
              { id: 'st-py2-12', title: 'Lambda functions, map(), filter(), and reduce()', description: 'Functional programming patterns in Python.' }
            ]
          }
        ]
      },
      {
        id: 'py2-m4',
        moduleNumber: 4,
        title: 'File Handling & Modules',
        summary: 'Opening files with with-statement, reading, writing, CSV module, math, random, and creating custom Python modules.',
        hours: 8,
        topics: [
          {
            id: 'py2-m4-t1',
            title: 'File Operations & CSV Processing',
            subtopics: [
              { id: 'st-py2-13', title: 'Opening files with "with open(...) as f", modes (r, w, a, r+)', description: 'Automatic file descriptor cleanup.' },
              { id: 'st-py2-14', title: 'Reading files: read(), readline(), readlines() and line iteration', description: 'Counting lines, words, and characters in text files.' },
              { id: 'st-py2-15', title: 'CSV module: csv.reader and csv.writer for engineering datasets', description: 'Reading tabular data with headers.' }
            ]
          },
          {
            id: 'py2-m4-t2',
            title: 'Python Modules & Packages',
            subtopics: [
              { id: 'st-py2-16', title: 'Importing modules, from ... import, math, random, datetime', description: 'Creating modular code and __name__ == "__main__" idiom.' }
            ]
          }
        ]
      },
      {
        id: 'py2-m5',
        moduleNumber: 5,
        title: 'Object-Oriented Programming & Exception Handling',
        summary: 'Classes, objects, __init__ constructor, inheritance, method overriding, try-except-finally blocks, and custom exceptions.',
        hours: 8,
        topics: [
          {
            id: 'py2-m5-t1',
            title: 'Classes, Objects & OOP Principles',
            subtopics: [
              { id: 'st-py2-17', title: 'Class definition, self parameter, and __init__() constructor', description: 'Instance variables vs class variables.' },
              { id: 'st-py2-18', title: 'Inheritance: Single, Multiple, Multilevel and super() function', description: 'Code reusability and method overriding.' },
              { id: 'st-py2-19', title: 'Encapsulation, private attributes (__var), and polymorphism', description: 'Dunder methods (__str__, __len__, __add__).' }
            ]
          },
          {
            id: 'py2-m5-t2',
            title: 'Exception Handling',
            subtopics: [
              { id: 'st-py2-20', title: 'try, except, else, and finally blocks', description: 'Catching ZeroDivisionError, ValueError, FileNotFoundError.' },
              { id: 'st-py2-21', title: 'Raising exceptions with raise and creating custom exception classes', description: 'Validating engineering input constraints.' }
            ]
          }
        ]
      }
    ]
  },

  {
    id: '1BECES203',
    code: '1BECES203',
    name: 'Digital Electronics and Principles',
    shortName: 'Digital Electronics (DEC)',
    semester: 2,
    credits: 3,
    category: 'Engineering Science',
    stream: 'CSE/AI-ML',
    description: 'Number systems, Boolean algebra, logic gates, Karnaugh maps, adders, subtractors, multiplexers, flip-flops, registers, and counters.',
    iconName: 'Cpu',
    modules: [
      {
        id: 'dec2-m1',
        moduleNumber: 1,
        title: 'Number Systems & Boolean Algebra',
        summary: 'Binary, octal, hexadecimal conversions, 1s and 2s complements, Boolean postulates, De Morgan theorems, and logic gates.',
        hours: 8,
        topics: [
          {
            id: 'dec2-m1-t1',
            title: 'Number Systems & Codes',
            subtopics: [
              { id: 'st-dec2-1', title: 'Binary, Octal, Hexadecimal conversions and arithmetic', description: 'Radix r to radix 10 and vice versa.' },
              { id: 'st-dec2-2', title: '1s and 2s complement binary subtraction and signed numbers', description: 'Overflow detection and arithmetic logic circuits.' },
              { id: 'st-dec2-3', title: 'BCD, Gray code, ASCII, and Excess-3 codes', description: 'Unit-distance code properties and conversions.' }
            ]
          },
          {
            id: 'dec2-m1-t2',
            title: 'Logic Gates & De Morgan\'s Laws',
            subtopics: [
              { id: 'st-dec2-4', title: 'Basic and Universal logic gates (NAND, NOR implementation)', description: 'Realizing AND, OR, NOT using only NAND or only NOR gates.' },
              { id: 'st-dec2-5', title: "De Morgan's Theorems and Boolean expression simplification", description: '(A + B)\' = A\'·B\' and (A·B)\' = A\' + B\'.' }
            ]
          }
        ]
      },
      {
        id: 'dec2-m2',
        moduleNumber: 2,
        title: 'Combinational Logic: K-Maps & Adders',
        summary: 'SOP and POS forms, 3-variable and 4-variable Karnaugh maps, don\'t care conditions, half adder, full adder, and half/full subtractor.',
        hours: 8,
        topics: [
          {
            id: 'dec2-m2-t1',
            title: 'Karnaugh Maps (K-Maps) Minimization',
            subtopics: [
              { id: 'st-dec2-6', title: 'Sum of Products (SOP) and Product of Sums (POS) canonical forms', description: 'Minterms (m) and Maxterms (M).' },
              { id: 'st-dec2-7', title: '3 and 4-variable K-Map minimization with Don\'t Care (d) terms', description: 'Forming pairs, quads, and octets; prime implicants.' }
            ]
          },
          {
            id: 'dec2-m2-t2',
            title: 'Arithmetic Combinational Circuits',
            subtopics: [
              { id: 'st-dec2-8', title: 'Half Adder and Full Adder circuit design using logic gates', description: 'Sum S = A ⊕ B ⊕ Cin and Carry Cout = AB + Cin(A ⊕ B).' },
              { id: 'st-dec2-9', title: 'Half Subtractor, Full Subtractor, and 4-bit Parallel Adder/Subtractor', description: 'Using 2s complement XOR control line.' }
            ]
          }
        ]
      },
      {
        id: 'dec2-m3',
        moduleNumber: 3,
        title: 'Multiplexers, Decoders & Combinational Modules',
        summary: 'Multiplexers (2:1, 4:1, 8:1), demultiplexers, 3:8 decoder, priority encoders, and logic implementation using MUX.',
        hours: 8,
        topics: [
          {
            id: 'dec2-m3-t1',
            title: 'Multiplexers and Demultiplexers',
            subtopics: [
              { id: 'st-dec2-10', title: 'Multiplexers (4:1, 8:1 MUX): Logic diagram and truth table', description: 'Data selectors in computer busses.' },
              { id: 'st-dec2-11', title: 'Implementing arbitrary Boolean functions using 4:1 and 8:1 MUX', description: 'Connecting inputs to ground, VCC, or control variables.' }
            ]
          },
          {
            id: 'dec2-m3-t2',
            title: 'Decoders & Encoders',
            subtopics: [
              { id: 'st-dec2-12', title: '3-to-8 Line Decoder (74LS138) with active-low enables', description: 'Address decoding in microprocessor memory systems.' },
              { id: 'st-dec2-13', title: 'Priority Encoder (8:3) and BCD-to-7-segment decoder', description: 'Driving LED numeric displays.' }
            ]
          }
        ]
      },
      {
        id: 'dec2-m4',
        moduleNumber: 4,
        title: 'Sequential Circuits: Latches & Flip-Flops',
        summary: 'Latches vs flip-flops, SR latch, clocked SR, JK flip-flop, race around condition, Master-Slave JK, D flip-flop, and T flip-flop.',
        hours: 8,
        topics: [
          {
            id: 'dec2-m4-t1',
            title: 'Flip-Flops and Timing',
            subtopics: [
              { id: 'st-dec2-14', title: 'SR Latch using NAND and NOR gates, clocked SR flip-flop', description: 'Set, reset, memory, and forbidden states.' },
              { id: 'st-dec2-15', title: 'JK Flip-Flop, Race-Around Condition, and Master-Slave JK Flip-Flop', description: 'Toggle state when J=1, K=1; eliminating races.' },
              { id: 'st-dec2-16', title: 'D Flip-Flop (Data) and T Flip-Flop (Toggle) excitation tables', description: 'Characteristic equations Q+ = D and Q+ = T ⊕ Q.' }
            ]
          }
        ]
      },
      {
        id: 'dec2-m5',
        moduleNumber: 5,
        title: 'Registers & Counters',
        summary: 'Shift registers (SISO, SIPO, PISO, PIPO), asynchronous (ripple) counters, synchronous up/down counters, and ring/Johnson counters.',
        hours: 8,
        topics: [
          {
            id: 'dec2-m5-t1',
            title: 'Shift Registers & Applications',
            subtopics: [
              { id: 'st-dec2-17', title: 'Shift Registers: SISO, SIPO, PISO, PIPO operations', description: 'Serial vs parallel data movement in processors.' },
              { id: 'st-dec2-18', title: 'Ring Counter and Johnson (Twisted Ring) Counter', description: 'State transitions and timing clock generation.' }
            ]
          },
          {
            id: 'dec2-m5-t2',
            title: 'Asynchronous & Synchronous Counters',
            subtopics: [
              { id: 'st-dec2-19', title: '4-bit Asynchronous (Ripple) Up/Down Counter using JK/T flip-flops', description: 'Propagation delay and frequency division.' },
              { id: 'st-dec2-20', title: 'Design of 3-bit Synchronous Up-Counter using state diagrams', description: 'Simultaneous clocking and next-state logic K-maps.' }
            ]
          }
        ]
      }
    ]
  },

  {
    id: '1BPWKS206',
    code: '1BPWKS206',
    name: 'Professional Writing Skills in English',
    shortName: 'Prof. Writing Skills (PWS)',
    semester: 2,
    credits: 1,
    category: 'Humanities & Social Sciences',
    stream: 'CSE/AI-ML',
    description: 'Grammar review, technical writing, executive summary, project proposals, error detection, paragraph coherence, and vocabulary.',
    iconName: 'FileText',
    modules: [
      {
        id: 'pws2-m1',
        moduleNumber: 1,
        title: 'Grammar Accuracy & Error Detection',
        summary: 'Subject-verb agreement, tenses in scientific reporting, passive voice in lab reports, prepositions, and article usage.',
        hours: 4,
        topics: [
          {
            id: 'pws2-m1-t1',
            title: 'Applied Grammar for Technical Contexts',
            subtopics: [
              { id: 'st-pws2-1', title: 'Subject-Verb Agreement and Common grammatical pitfalls', description: 'Singular/plural mismatch, collective nouns, compound subjects.' },
              { id: 'st-pws2-2', title: 'Active vs Passive Voice in engineering and research reports', description: 'Impersonal passive in experimental procedures.' }
            ]
          }
        ]
      },
      {
        id: 'pws2-m2',
        moduleNumber: 2,
        title: 'Technical Report & Proposal Drafting',
        summary: 'Structuring project reports, writing abstract, executive summary, problem statement, and literature citations.',
        hours: 4,
        topics: [
          {
            id: 'pws2-m2-t1',
            title: 'Engineering Report Artifacts',
            subtopics: [
              { id: 'st-pws2-3', title: 'Writing concise Abstracts and Executive Summaries for software projects', description: 'Stating objective, methodology, key findings and impact.' },
              { id: 'st-pws2-4', title: 'Drafting formal technical project proposals and engineering memos', description: 'Scope, timeline, budget, and deliverables organization.' }
            ]
          }
        ]
      }
    ]
  },

  {
    id: '1BCIC209',
    code: '1BCIC209',
    name: 'Constitution of India & Professional Ethics',
    shortName: 'Constitution & Ethics (CIP)',
    semester: 2,
    credits: 1,
    category: 'Humanities & Social Sciences',
    stream: 'CSE/AI-ML',
    description: 'Indian Constitution preamble, fundamental rights, directive principles, union executive, judiciary, cyber law, IT Act 2000, and engineering code of ethics.',
    iconName: 'Shield',
    modules: [
      {
        id: 'cip2-m1',
        moduleNumber: 1,
        title: 'Preamble, Fundamental Rights & Directive Principles',
        summary: 'Constitutional philosophy, citizenship, fundamental rights (Articles 14-32), writ jurisdiction, and fundamental duties.',
        hours: 4,
        topics: [
          {
            id: 'cip2-m1-t1',
            title: 'Constitutional Framework',
            subtopics: [
              { id: 'st-cip2-1', title: 'Preamble of Indian Constitution: Sovereign, Socialist, Secular, Democratic, Republic', description: 'Philosophy, justice, liberty, equality and fraternity.' },
              { id: 'st-cip2-2', title: 'Fundamental Rights (Articles 14 to 32) and Judicial Writs (Habeas Corpus, Mandamus, Certiorari)', description: 'Enforcement mechanisms and constitutional remedies.' },
              { id: 'st-cip2-3', title: 'Directive Principles of State Policy (DPSP) and Fundamental Duties (Article 51A)', description: 'Welfare state guidelines and citizen obligations.' }
            ]
          }
        ]
      },
      {
        id: 'cip2-m2',
        moduleNumber: 2,
        title: 'Engineering Ethics & Cyber Law (IT Act 2000)',
        summary: 'Code of ethics, intellectual property ethics, conflict of interest, whistleblowing, IT Act 2000 provisions, cyber crimes, and digital data privacy.',
        hours: 4,
        topics: [
          {
            id: 'cip2-m2-t1',
            title: 'Professional Ethics & Cyber Law in India',
            subtopics: [
              { id: 'st-cip2-4', title: 'IEEE and ACM Codes of Ethics: Safety, public welfare, avoiding harm, honesty', description: 'Ethical responsibilities in software engineering and AI systems.' },
              { id: 'st-cip2-5', title: 'Information Technology Act (IT Act 2000): Cyber crimes, unauthorized access, identity theft', description: 'Sections 65, 66, 67 and digital signature legalities.' },
              { id: 'st-cip2-6', title: 'Digital Personal Data Protection Act (DPDP): Data fiduciary, user privacy rights', description: 'Compliance requirements for tech companies handling user data.' }
            ]
          }
        ]
      }
    ]
  }
];

export const VTU_SYLLABUS_DATA = VTU_SUBJECTS;
