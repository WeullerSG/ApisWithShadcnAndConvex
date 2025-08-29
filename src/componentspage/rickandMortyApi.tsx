import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

type Character = {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  episode: string[];
};

export function Characters() {
  const [chars, setChars] = useState<Character[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setChars((prev) => {
          const all = [...prev, ...data.results];

          const unique = all.filter(
            (char, index, self) => index === self.findIndex(c => c.id === char.id)
          );
          return unique;
        });
      });
  }, [page]);

  const filteredChars = chars.filter((char) =>
    char.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center py-6">
        Rick and Morty API
      </h1>

      <div className="flex justify-center mb-6">
        <Input
          type="text"
          placeholder="Pesquisar personagem..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-md w-1/2"
        ></Input>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {filteredChars.map((char) => (
          <Card key={char.id} className="shadow-lg">
            <CardHeader>
              <CardTitle>{char.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={char.image}
                alt={char.name}
                className="rounded-xl mb-3"
              />
              <p>
                <strong>Status:</strong> {char.status}
              </p>
              <p>
                <strong>Species:</strong> {char.species}
              </p>
              <p>
                <strong>First Episode:</strong>{" "}
                {char.episode[0].split("/").pop()}
              </p>
              {char.status === "Dead" ? (
                <p>
                  <strong>Last Episode:</strong>{" "}
                  {char.episode.at(-1)?.split("/").pop()}
                </p>
              ) : " "}
              {/* {char.status === "Dead" && console.log(char.episode.at(-1)?.split("/").pop())} */}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center pb-6">
        <Button
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          {" "}
          carregar mais
        </Button>
      </div>
    </div>
  );
}
