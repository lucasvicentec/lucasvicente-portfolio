import type { Track, ProgressState } from "../types";

interface TrackListProps {
  tracks: Track[];
  progress: ProgressState;
  onSelect: (trackId: string) => void;
}

export default function TrackList({ tracks, progress, onSelect }: TrackListProps) {
  return (
    <div className="track-list">
      <h2 style={{ marginBottom: "20px" }}>Pistas de Estudio</h2>
      <div className="track-grid">
        {tracks.map((track) => {
          const done = track.exercises.filter((e) =>
            progress.completed.includes(e.id)
          ).length;
          const total = track.exercises.length;
          const pct = total > 0 ? Math.round((done / total) * 100) : 0;

          return (
            <div
              key={track.id}
              className="track-card"
              onClick={() => onSelect(track.id)}
              style={{ borderColor: track.color + "33" }}
            >
              <div
                className="track-card-icon"
                style={{ background: track.color + "22", color: track.color }}
              >
                {track.icon}
              </div>
              <div className="track-card-info">
                <h3>{track.title}</h3>
                <p>{track.desc}</p>
                <div className="track-card-meta">
                  <span style={{ color: track.color }}>
                    Semana {track.week}
                  </span>
                  <span>
                    {done}/{total} ejercicios
                  </span>
                </div>
                <div className="track-card-bar-bg">
                  <div
                    className="track-card-bar-fill"
                    style={{ width: pct + "%", background: track.color }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
