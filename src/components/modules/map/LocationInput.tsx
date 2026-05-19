import React, { useState, useEffect } from 'react';
import { Search, MapPin, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Location {
  lat: number;
  lng: number;
  title: string;
}

interface LocationInputProps {
  onSelect: (location: Location) => void;
  defaultValue?: Location | null;
}

interface NominatimPlace {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

const LocationInput: React.FC<LocationInputProps> = ({ onSelect, defaultValue }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<NominatimPlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(defaultValue || null);

  // Sync with defaultValue when it changes (important for edit mode)
  useEffect(() => {
    if (defaultValue && defaultValue.title) {
      setSelectedLocation(defaultValue);
    }
  }, [defaultValue]);

  // Debounce search
  useEffect(() => {
    const trimmed = query.trim();

    if (!trimmed) {
      setResults([]);
      setError(null);
      return;
    }

    if (trimmed.length < 2) {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      searchLocation(trimmed);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const searchLocation = async (searchQuery: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}&limit=5`,
        {
          headers: {
            'User-Agent': 'TourApp/1.0',
          },
        }
      );
      const data: NominatimPlace[] = await res.json();
      setResults(data);
      if (data.length === 0) setError('No results found. Try a different search term.');
    } catch {
      setError('Failed to fetch locations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (place: NominatimPlace) => {
    const location = {
      lat: parseFloat(place.lat),
      lng: parseFloat(place.lon),
      title: place.display_name,
    };

    setSelectedLocation(location);
    onSelect(location);
    setQuery('');
    setResults([]);
    setError(null);
  };

  const handleClearSelection = () => {
    setSelectedLocation(null);
    onSelect({ lat: 0, lng: 0, title: '' });
    setQuery('');
    setResults([]);
    setError(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.trim() === '') {
      setResults([]);
      setError(null);
    }
  };

  // If location is selected, show only the selected card
  if (selectedLocation && selectedLocation.title) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/30">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <div className="mt-0.5">
              <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="mb-1 text-sm font-semibold text-green-900 dark:text-green-100">
                Selected Location
              </p>
              <p className="text-sm leading-relaxed break-words text-green-700 dark:text-green-300">
                {selectedLocation.title}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="border-green-300 bg-white text-xs text-green-700 dark:border-green-700 dark:bg-green-950 dark:text-green-300"
                >
                  Lat: {selectedLocation.lat.toFixed(6)}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-green-300 bg-white text-xs text-green-700 dark:border-green-700 dark:bg-green-950 dark:text-green-300"
                >
                  Lng: {selectedLocation.lng.toFixed(6)}
                </Badge>
              </div>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClearSelection}
            className="h-8 w-8 flex-shrink-0 p-0 text-green-700 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900/30"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  // If no location is selected, show the search interface
  return (
    <div className="space-y-3">
      {/* Search Input */}
      <div className="relative">
        <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a city or place..."
          className="h-10 pl-9"
        />
      </div>

      {/* Results Section */}
      {query.trim().length >= 2 && (
        <div className="bg-card overflow-hidden rounded-lg border shadow-sm">
          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center px-4 py-8">
              <Loader2 className="text-muted-foreground mb-2 h-6 w-6 animate-spin" />
              <p className="text-muted-foreground text-sm">Searching for locations...</p>
            </div>
          )}

          {/* Error Message */}
          {!loading && error && (
            <div className="bg-destructive/10 p-4">
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}

          {/* Results List */}
          {!loading && !error && results.length > 0 && (
            <div className="divide-border max-h-64 divide-y overflow-y-auto">
              {results.map((place) => (
                <button
                  key={place.place_id}
                  type="button"
                  className="hover:bg-accent/50 active:bg-accent focus-visible:ring-ring w-full p-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  onClick={() => handleSelect(place)}
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="text-muted-foreground mt-0.5 h-4 w-4 flex-shrink-0" />
                    <p className="text-card-foreground text-sm leading-relaxed">
                      {place.display_name}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
