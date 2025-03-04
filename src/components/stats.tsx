import React, { useEffect, useState } from "react";
import GitHubCalendar from "react-github-calendar";
import ActivityCalendar from "react-activity-calendar";
import { CheckCircle, Github, Code2 } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ActivityTracker = () => {
  const { theme } = useTheme();
  const currentTheme = theme || "light";
  const isDark = currentTheme === "dark";

  const [githubActivity, setGithubActivity] = useState([]);
  const [leetcodeStats, setLeetcodeStats] = useState(null);
  const [leetcodeContributions, setLeetcodeContributions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGitHubActivity();
    fetchLeetCodeData();
  }, []);

  const fetchGitHubActivity = async () => {
    try {
      const response = await fetch("https://api.github.com/users/kailzxh/events");
      if (!response.ok) throw new Error("GitHub API error");
      const data = await response.json();
      setGithubActivity(data.slice(0, 5));
    } catch (error) {
      setError("Failed to load GitHub activity.");
    } finally {
      setLoading(false);
    }
  };

  const fetchLeetCodeData = async () => {
    try {
      const username = "Kailzxh";
      const response = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${username}`);
      if (!response.ok) throw new Error("LeetCode API error");
      const data = await response.json();

      if (!data.totalSolved) throw new Error("LeetCode user not found or no data available.");

      setLeetcodeStats({
        totalSolved: data.totalSolved,
        easySolved: data.easySolved,
        mediumSolved: data.mediumSolved,
        hardSolved: data.hardSolved,
        totalQuestions: data.totalQuestions,
        ranking: data.ranking,
      });

      if (data.submissionCalendar) {
        const formattedContributions = Object.keys(data.submissionCalendar).map((timestamp) => ({
          date: new Date(parseInt(timestamp) * 1000).toISOString().split("T")[0],
          count: data.submissionCalendar[timestamp],
        }));
        setLeetcodeContributions(formattedContributions);
      }
    } catch (error) {
      setLeetcodeStats(null);
      setLeetcodeContributions([]);
    } finally {
      setLoading(false);
    }
  };

  // GitHub calendar theme to match GitHub's actual colors
  const githubTheme = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
  };

  // LeetCode calendar theme to match LeetCode's actual colors
  const leetcodeTheme = {
    light: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
  };

  return (
    <section  id="coding-activity" className="py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Coding Activity</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Here's a snapshot of my daily coding journey across GitHub and LeetCode.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* GitHub Section */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all">
              <div className="flex items-center mb-4">
                <Github className="text-gray-700 dark:text-gray-200 mr-3" size={24} />
                <h3 className="text-2xl font-bold">GitHub Activity</h3>
              </div>
              
              {error && <p className="text-red-500 mb-4">{error}</p>}
              
              <ul className="space-y-4">
                {loading ? (
                  <div className="animate-pulse space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    ))}
                  </div>
                ) : githubActivity.length > 0 ? (
                  githubActivity.map((event, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" size={18} />
                      <span className="text-gray-700 dark:text-gray-300">
                        {event.type.replace("Event", "")} in <span className="font-semibold">{event.repo.name}</span> 
                        <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {new Date(event.created_at).toLocaleDateString(undefined, { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </span>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">No recent activity</p>
                )}
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all">
              <div className="flex items-center mb-4">
                <Github className="text-gray-700 dark:text-gray-200 mr-3" size={24} />
                <h3 className="text-2xl font-bold">GitHub Contributions</h3>
              </div>
              <div className="overflow-x-auto pb-2">
                <div className="min-w-[700px]">
                  <GitHubCalendar 
                    username="kailzxh" 
                    colorScheme={currentTheme}
                    theme={githubTheme}
                    hideColorLegend={false}
                    labels={{
                      totalCount: '{{count}} contributions in the last year',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* LeetCode Section */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all">
              <div className="flex items-center mb-4">
                <Code2 className="text-gray-700 dark:text-gray-200 mr-3" size={24} />
                <h3 className="text-2xl font-bold">LeetCode Stats</h3>
              </div>
              
              {loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                </div>
              ) : leetcodeStats ? (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-medium">Solved Problems</span>
                      <span className="text-lg font-bold">
                        {leetcodeStats.totalSolved} <span className="text-gray-500 dark:text-gray-400 font-normal">/ {leetcodeStats.totalQuestions}</span>
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-green-500 h-2.5 rounded-full" 
                        style={{ width: `${(leetcodeStats.totalSolved / leetcodeStats.totalQuestions) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 mb-2">
                        <span className="text-green-600 dark:text-green-300 font-bold">{leetcodeStats.easySolved}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Easy</p>
                    </div>
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900 mb-2">
                        <span className="text-yellow-600 dark:text-yellow-300 font-bold">{leetcodeStats.mediumSolved}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Medium</p>
                    </div>
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 mb-2">
                        <span className="text-red-600 dark:text-red-300 font-bold">{leetcodeStats.hardSolved}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Hard</p>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-gray-600 dark:text-gray-300">
                      Global Ranking: <span className="font-semibold">#{leetcodeStats.ranking}</span>
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">Unable to load LeetCode stats</p>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all">
              <div className="flex items-center mb-4">
                <Code2 className="text-gray-700 dark:text-gray-200 mr-3" size={24} />
                <h3 className="text-2xl font-bold">LeetCode Contributions</h3>
              </div>
              <div className="overflow-x-auto pb-2">
                <div className="min-w-[700px]">
                  {loading ? (
                    <div className="animate-pulse h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  ) : leetcodeContributions.length > 0 ? (
                    <ActivityCalendar
                      data={leetcodeContributions}
                      theme={leetcodeTheme}
                      colorScheme={currentTheme}
                      hideColorLegend={false}
                      labels={{
                        totalCount: '{{count}} submissions in the last year',
                      }}
                    />
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">No LeetCode submissions found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivityTracker;