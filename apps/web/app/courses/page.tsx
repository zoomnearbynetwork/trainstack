import { apiFetch, loginAsAdmin } from '../../lib/api';

type Course = {
  id: string;
  title: string;
  category?: string | null;
  level?: string | null;
  duration?: string | null;
};

export default async function CoursesPage() {
  let courses: Course[] = [];

  try {
    const login = await loginAsAdmin();
    courses = await apiFetch('/courses', {
      headers: { Authorization: `Bearer ${login.accessToken}` }
    });
  } catch {
    courses = [];
  }

  return (
    <main className="container">
      <h1>Courses</h1>
      <div className="grid">
        {courses.map((course) => (
          <div className="card" key={course.id}>
            <strong>{course.title}</strong>
            <div className="muted">{course.category || 'General'} • {course.level || 'All levels'}</div>
            <div>{course.duration || 'TBD'}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
