
export default function Footer({ count }) {
  return (
    <div className="text-center text-sm text-gray-500 py-4 ml-350">
      times visited{' '}
      <span className="font-bold text-indigo-600">{count ?? '...'}</span> times.
    </div>
  );
}
