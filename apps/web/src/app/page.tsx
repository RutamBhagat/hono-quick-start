"use client"

import { useState, useEffect } from 'react';

const TITLE_TEXT = `
 ██████╗ ███████╗████████╗████████╗███████╗██████╗
 ██╔══██╗██╔════╝╚══██╔══╝╚══██╔══╝██╔════╝██╔══██╗
 ██████╔╝█████╗     ██║      ██║   █████╗  ██████╔╝
 ██╔══██╗██╔══╝     ██║      ██║   ██╔══╝  ██╔══██╗
 ██████╔╝███████╗   ██║      ██║   ███████╗██║  ██║
 ╚═════╝ ╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝

 ████████╗    ███████╗████████╗ █████╗  ██████╗██╗  ██╗
 ╚══██╔══╝    ██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝
    ██║       ███████╗   ██║   ███████║██║     █████╔╝
    ██║       ╚════██║   ██║   ██╔══██║██║     ██╔═██╗
    ██║       ███████║   ██║   ██║  ██║╚██████╗██║  ██╗
    ╚═╝       ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
 `;

export default function Home() {
  const [isHealthy, setIsHealthy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        // TODO: Make this URL configurable via environment variables
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}`
        );
        if (response.ok) {
          interface HealthCheckResponse { healthy: boolean; }
          const data: HealthCheckResponse = await response.json();
          setIsHealthy(data.healthy);
        } else {
          setIsHealthy(false);
          setError(`Backend responded with status: ${response.status}`);
        }
      } catch (err) {
        setIsHealthy(false);
        setError('Failed to connect to backend API.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
  }, []);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-2">
      <pre className="overflow-x-auto font-mono text-sm">{TITLE_TEXT}</pre>
      <div className="grid gap-6">
        <section className="rounded-lg border p-4">
          <h2 className="mb-2 font-medium">API Status</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  isHealthy ? 'bg-green-500' : 'bg-red-500'
                }`}
              ></div>
              <p className="text-sm">
                Backend is {isHealthy ? 'connected and healthy' : 'not connected or unhealthy'}.
              </p>
              {error && <p className="text-xs text-red-500">{error}</p>}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
