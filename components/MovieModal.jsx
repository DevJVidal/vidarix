export default function MovieModal({ movie, trailer, onClose }) {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-primary rounded-lg p-5 w-[90%] max-w-3xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white font-bold text-xl"
        >
          ×
        </button>
        <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
        <p className="mb-4">{movie.overview}</p>
        {trailer ? (
          <div className="aspect-video">
            <iframe
              src={trailer.replace("watch?v=", "embed/")}
              title={movie.title}
              frameBorder="0"
              allowFullScreen
              className="w-full h-full rounded"
            ></iframe>
          </div>
        ) : (
          <p>Trailer não disponível.</p>
        )}
      </div>
    </div>
  );
}
