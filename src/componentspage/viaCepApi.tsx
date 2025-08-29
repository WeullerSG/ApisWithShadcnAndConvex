import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

type Adress = {
  cep: number;
  logradouro: string;
  bairro: string;
  localidade: string;
  estado: string;
  uf: string;
};

export function Adress() {
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState<Adress | null>(null);

  const handleSearch = () => {
    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.erro) {
            setAddress(data);
          } else {
            setAddress(null);
            alert("CEP não encontrado!");
          }
        });
    } else {
      alert("Digite um CEP valido de 8 digitos!");
    }
  };

  return (
    <div className="flex flex-col gap-4 w-80 mx-auto mt-10">
    <div className="flex gap-2">
      <Input
        type="text"
        placeholder="Digite seu cep"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
      />

      <Button onClick={handleSearch} className="bg-blue-500 text-white">
        Buscar CEP
      </Button>
      </div>
      
      {address && (
        <div className="text-sm text-left">
          <p>
            <strong>Logradouro:</strong> {address.logradouro}
          </p>
          <p>
            <strong>Bairro:</strong> {address.bairro}
          </p>
          <p>
            <strong>Cidade:</strong> {address.localidade} - {address.uf}
          </p>
        </div>
      )}
    </div>
  );
}
