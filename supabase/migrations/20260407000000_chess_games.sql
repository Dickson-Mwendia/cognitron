CREATE TABLE IF NOT EXISTS chess_games (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  opponent_id text NOT NULL,
  pgn text NOT NULL DEFAULT '',
  result text NOT NULL CHECK (result IN ('win', 'loss', 'draw')),
  moves integer NOT NULL DEFAULT 0,
  rating_before integer NOT NULL DEFAULT 1200,
  rating_after integer NOT NULL DEFAULT 1200,
  xp_earned integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_chess_games_student ON chess_games(student_id);
CREATE INDEX idx_chess_games_opponent ON chess_games(student_id, opponent_id);

ALTER TABLE chess_games ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own games"
  ON chess_games FOR SELECT
  USING (student_id = (SELECT id FROM profiles WHERE user_id = auth.uid()));

CREATE POLICY "Students can insert own games"
  ON chess_games FOR INSERT
  WITH CHECK (student_id = (SELECT id FROM profiles WHERE user_id = auth.uid()));
