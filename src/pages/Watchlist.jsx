import MovieGrid from "../components/MovieGrid";
import { useWatchlist } from "../contexts/MovieContent";

function Watchlist() {
    const { watchlist } = useWatchlist();

    return (
        <main className="main-content">
            <div className="content-header">
                <h2>My Watchlist</h2>
                <p>Movies you're planning to watch</p>
            </div>
            {watchlist.length > 0 ? (
                <MovieGrid movies={watchlist} />
            ) : (
                <div className="empty-state">
                    <p>No movies in your watchlist yet. Start adding some from the home page!</p>
                </div>
            )}
        </main>
    );
};

export default Watchlist;