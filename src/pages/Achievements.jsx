import { useEffect, useState } from "react";
import Loadertwo from "../components/Loadertwo";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

const ALL_ACHIEVEMENTS = [
  "Task Slayer (First Task Done)",
  "On a Roll (5 Tasks Completed)",
  "Task Machine (10 Tasks Completed)",
  "Task Legend (20 Tasks Completed)",
  "Welcome Aboard! (First Day Milestone)",
  "Weekly Warrior (5 Days Worked)",
  "Workplace Champ (10 Days Streak)",
  "Clocked In (10+ Hours Logged)",
  "Time Titan (50+ Hours of Dedication)",
];

const Achievements = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userEmail = currentUser?.email;

  const [achievements, setAchievements] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [daysWorked, setDaysWorked] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [width, height] = useWindowSize();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userEmail) return;

    const fetchData = async () => {
      try {
        // 1. Fetch completed tasks
        const tasksQuery = query(
          collection(db, "tasks"),
          where("email", "==", userEmail),
          where("completed", "==", true)
        );
        const taskSnap = await getDocs(tasksQuery);
        const completed = [];
        taskSnap.forEach((doc) => completed.push(doc.data()));
        setCompletedTasks(completed);

        // 2. Fetch attendance
        const attendanceDoc = await getDoc(doc(db, "attendance", userEmail));
        const attendanceData = attendanceDoc.exists() ? attendanceDoc.data() : { attendanceLog: [] };

        const workedDays = Array.from(
          new Set(
            (attendanceData.attendanceLog || [])
              .filter((log) => log.type === "Check Out")
              .map((log) => log.date)
          )
        );

        const hours = (attendanceData.attendanceLog || []).reduce(
          (sum, entry) => sum + (parseFloat(entry.workingHours) || 0),
          0
        );

        setDaysWorked(workedDays);
        setTotalHours(hours);

        // 3. Fetch stored achievements
        const achDocRef = doc(db, "achievements", userEmail);
        const achDocSnap = await getDoc(achDocRef);
        const storedAchievements = achDocSnap.exists()
          ? achDocSnap.data().unlocked || []
          : [];

        // 4. Determine new achievements
        const newAchievements = [];

        if (completed.length >= 1) newAchievements.push("Task Slayer (First Task Done)");
        if (completed.length >= 5) newAchievements.push("On a Roll (5 Tasks Completed)");
        if (completed.length >= 10) newAchievements.push("Task Machine (10 Tasks Completed)");
        if (completed.length >= 20) newAchievements.push("Task Legend (20 Tasks Completed)");

        if (workedDays.length >= 1) newAchievements.push("Welcome Aboard! (First Day Milestone)");
        if (workedDays.length >= 5) newAchievements.push("Weekly Warrior (5 Days Worked)");
        if (workedDays.length >= 10) newAchievements.push("Workplace Champ (10 Days Streak)");

        if (hours >= 10) newAchievements.push("Clocked In (10+ Hours Logged)");
        if (hours >= 50) newAchievements.push("Time Titan (50+ Hours of Dedication)");

        const mergedAchievements = Array.from(
          new Set([...storedAchievements, ...newAchievements])
        );

        const newlyUnlocked = newAchievements.filter(
          (ach) => !storedAchievements.includes(ach)
        );

        if (newlyUnlocked.length > 0) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 8000);
        }

        setAchievements(mergedAchievements);

        // 5. Save to Firestore
        await setDoc(achDocRef, {
          unlocked: mergedAchievements,
          lastUpdated: Date.now()
        });

      } catch (err) {
        console.error("Error fetching achievements:", err);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [userEmail]);

  if (!userEmail) {
    return <p className="p-6 text-red-600 font-semibold">User not logged in.</p>;
  }

  const lockedAchievements = ALL_ACHIEVEMENTS.filter(
    (ach) => !achievements.includes(ach)
  );

  return (
    <>
      {showConfetti && <Confetti width={width} height={height} />}
      <div className="min-h-screen p-6 bg-gradient-to-tr from-blue-50 to-white animate-fade-in">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Your Achievements</h1>
{loading ? (
        <Loadertwo />
    ) : (
      <>
        {achievements.length === 0 ? (
          <p className="text-gray-600 mb-6">
            No achievements yet. Complete tasks and check in regularly to earn badges!
          </p>
        ) : (
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Unlocked</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {achievements.map((achieve, index) => {
                const match = achieve.match(/^(.*?)\s*\((.*?)\)$/);
                const title = match?.[1] || achieve;
                const description = match?.[2] || "";
                const isHovered = hoveredIndex === index;

                return (
                  <div
                    key={index}
                    className="relative bg-gradient-to-br from-blue-100 to-blue-50 p-5 rounded-xl border-2 border-blue-400 shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className="absolute top-2 right-2 text-blue-400 text-xl">🏅</div>
                    <p className="text-lg font-semibold text-center text-blue-800">
                      {isHovered ? description : title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {lockedAchievements.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Locked Achievements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {lockedAchievements.map((locked, idx) => {
                try {
                  let title = locked;
                  let description = "";
                  if (locked.includes("(") && locked.includes(")")) {
                    const match = locked.match(/^(.*?)\s*\((.*?)\)$/);
                    title = match?.[1] || locked;
                    description = match?.[2] || "";
                  }

                  let current = 0;
                  let target = 1;

                  if (locked.includes("Task Slayer")) {
                    target = 1;
                    current = completedTasks.length;
                  } else if (locked.includes("On a Roll")) {
                    target = 5;
                    current = completedTasks.length;
                  } else if (locked.includes("Task Machine")) {
                    target = 10;
                    current = completedTasks.length;
                  } else if (locked.includes("Task Legend")) {
                    target = 20;
                    current = completedTasks.length;
                  } else if (locked.includes("Welcome Aboard")) {
                    target = 1;
                    current = daysWorked.length;
                  } else if (locked.includes("Weekly Warrior")) {
                    target = 5;
                    current = daysWorked.length;
                  } else if (locked.includes("Workplace Champ")) {
                    target = 10;
                    current = daysWorked.length;
                  } else if (locked.includes("Clocked In")) {
                    target = 10;
                    current = totalHours;
                  } else if (locked.includes("Time Titan")) {
                    target = 50;
                    current = totalHours;
                  }

                  const progress = Math.min((current / target) * 100, 100);

                  return (
                    <div
                      key={idx}
                      className="relative bg-gray-200 p-4 rounded-xl border border-gray-300 text-gray-500 hover:scale-105 transition-all duration-300 cursor-not-allowed"
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-3xl text-gray-400">
                        🔒
                      </div>

                      <p className="text-lg font-semibold text-center text-gray-600 blur-[3px]">
                        {title}
                      </p>
                      <p className="text-sm text-center text-gray-500 mb-2 blur-[2px]">{description}</p>

                      <div className="relative mt-4">
                        <div className="w-full h-2 bg-gray-300 rounded-full">
                          <div
                            className="h-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-center mt-1 text-gray-500">
                          {Math.floor(progress)}% Complete
                        </p>
                      </div>
                    </div>
                  );
                } catch (err) {
                  return (
                    <div key={idx} className="text-red-500 text-sm">
                      Error loading achievement
                    </div>
                  );
                }
              })}
            </div>
          </div>
        )}
        </>
        )}
      </div>
    </>
  );
};

export default Achievements;
