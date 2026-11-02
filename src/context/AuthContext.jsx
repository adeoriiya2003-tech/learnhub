import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function getUserEnrollments(email) {
  if (!email) return [];

  const savedEnrollments = localStorage.getItem(
    `learnhub_enrollments_${email}`,
  );

  return savedEnrollments ? JSON.parse(savedEnrollments) : [];
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("learnhub_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [enrollments, setEnrollments] = useState(() => {
    const savedUser = localStorage.getItem("learnhub_user");
    const currentUser = savedUser ? JSON.parse(savedUser) : null;

    return currentUser ? getUserEnrollments(currentUser.email) : [];
  });

  function registerUser(userData) {
    const savedUsers = JSON.parse(
      localStorage.getItem("learnhub_users") || "[]",
    );

    const emailExists = savedUsers.some(
      (existingUser) =>
        existingUser.email.toLowerCase() === userData.email.toLowerCase(),
    );

    if (emailExists) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    const updatedUsers = [...savedUsers, userData];

    localStorage.setItem("learnhub_users", JSON.stringify(updatedUsers));

    const newUser = {
      fullName: userData.fullName,
      email: userData.email,
    };

    setUser(newUser);
    setEnrollments([]);

    localStorage.setItem("learnhub_user", JSON.stringify(newUser));
    localStorage.setItem(
      `learnhub_enrollments_${newUser.email}`,
      JSON.stringify([]),
    );

    return { success: true };
  }

  function loginUser(email, password) {
    const savedUsers = JSON.parse(
      localStorage.getItem("learnhub_users") || "[]",
    );

    const foundUser = savedUsers.find(
      (savedUser) =>
        savedUser.email.toLowerCase() === email.toLowerCase() &&
        savedUser.password === password,
    );

    if (!foundUser) {
      return {
        success: false,
        message: "Incorrect email or password.",
      };
    }

    const loggedInUser = {
      fullName: foundUser.fullName,
      email: foundUser.email,
    };

    setUser(loggedInUser);
    setEnrollments(getUserEnrollments(loggedInUser.email));

    localStorage.setItem("learnhub_user", JSON.stringify(loggedInUser));

    return { success: true };
  }

  function logoutUser() {
    setUser(null);
    setEnrollments([]);
    localStorage.removeItem("learnhub_user");
  }

  function enrollInCourse(courseId) {
    if (!user) {
      return {
        success: false,
        message: "Please log in to enrol in a course.",
      };
    }

    const alreadyEnrolled = enrollments.some(
      (enrollment) => enrollment.courseId === courseId,
    );

    if (alreadyEnrolled) {
      return {
        success: false,
        message: "You are already enrolled in this course.",
      };
    }

    const newEnrollment = {
      courseId,
      progress: 0,
      status: "In Progress",
      lastAccessed: "Just enrolled",
    };

    const updatedEnrollments = [...enrollments, newEnrollment];

    setEnrollments(updatedEnrollments);

    localStorage.setItem(
      `learnhub_enrollments_${user.email}`,
      JSON.stringify(updatedEnrollments),
    );

    return { success: true };
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        enrollments,
        registerUser,
        loginUser,
        logoutUser,
        enrollInCourse,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
