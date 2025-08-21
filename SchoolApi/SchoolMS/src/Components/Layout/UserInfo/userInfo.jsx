import { useEffect, useState } from "react";
import { getStudentProfile } from "../../../Services/ProfileApi";

function UserInfo({ userId }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        setError(null);
        const response = await getStudentProfile(userId);
        setProfile(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [userId]);

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile data found.</div>;

  return (
    <div className="student-profile" style={{ maxWidth: 600, margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h2>{profile.fullName}</h2>
      <p><strong>Gender:</strong> {profile.gender}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Phone:</strong> {profile.phone}</p>
      <p><strong>Address:</strong> {profile.address}</p>
      <p><strong>Class:</strong> {profile.class}</p>
      <p><strong>Academic Year:</strong> {profile.academicYear}</p>

      {profile.parent && (
        <div style={{ marginTop: 20 }}>
          <h3>Parent Info</h3>
          <p><strong>Name:</strong> {profile.parent.name}</p>
          <p><strong>Phone:</strong> {profile.parent.phone}</p>
          <p><strong>Email:</strong> {profile.parent.email}</p>
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        <h3>Subjects</h3>
        <ul>
          {profile.subjects.map((subject, i) => (
            <li key={i}>{subject}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: 20 }}>
        <h3>Grades</h3>
        <ul>
          {profile.grades.map((grade, i) => (
            <li key={i}>
              {grade.subject}: {grade.score} ({grade.grade})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserInfo;
