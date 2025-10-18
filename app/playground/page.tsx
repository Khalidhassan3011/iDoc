import { getAllProblems } from '@/lib/get-problems';
import PlaygroundClient from './playground-client';

export default function PlaygroundPage() {
  const problems = getAllProblems();

  return <PlaygroundClient problems={problems} />;
}
