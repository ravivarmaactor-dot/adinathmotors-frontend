import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { MessageSquare, Clock, CheckCircle2, Users } from 'lucide-react';

interface Stats {
  total: number;
  pending: number;
  completed: number;
  today: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({ total: 0, pending: 0, completed: 0, today: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const q = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        let total = 0;
        let pending = 0;
        let completed = 0;
        let today = 0;
        
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          total++;
          
          if (data.status === 'completed') completed++;
          else pending++; // default to pending if missing or other status

          if (data.createdAt) {
            let createdAtTime = 0;
            if (typeof data.createdAt.toMillis === 'function') {
              createdAtTime = data.createdAt.toMillis();
            } else if (data.createdAt.seconds) {
              createdAtTime = data.createdAt.seconds * 1000;
            } else {
              createdAtTime = new Date(data.createdAt).getTime();
            }
            if (createdAtTime >= startOfToday) {
              today++;
            }
          }
        });

        setStats({ total, pending, completed, today });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { name: 'Total Enquiries', value: stats.total, icon: MessageSquare, color: 'bg-blue-50 text-blue-600' },
    { name: "Today's Enquiries", value: stats.today, icon: Users, color: 'bg-indigo-50 text-indigo-600' },
    { name: 'Pending Enquiries', value: stats.pending, icon: Clock, color: 'bg-amber-50 text-amber-600' },
    { name: 'Completed Enquiries', value: stats.completed, icon: CheckCircle2, color: 'bg-green-50 text-green-600' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-gray-500">Welcome to your admin panel. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((item) => (
          <div key={item.name} className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-100">
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 p-3 rounded-lg ${item.color}`}>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                    <dd>
                      <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
