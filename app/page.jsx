'use client';
// Indica que este es un componente de cliente en Next.js
import CreateCard from "@/components/card";
import { getHeros, getHero } from "@/libs/getHeros";
import { useEffect, useState } from "react";
import { Pagination } from "@heroui/pagination";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure
} from "@heroui/modal";
import { Image } from "@heroui/image";
import { Spinner } from "@heroui/spinner";
import { Chip } from "@heroui/chip";
import { ThemeSwitch } from "@/components/theme-switch";

export default function Home() {
  // Estado para almacenar la lista de héroes y metadatos de paginación
  const [heros, setHeros] = useState({ lastPage: 1, data: [] });

  // Estado para controlar la paginación
  const [pagination, setPagination] = useState(1);
  const [size, setSize] = useState(12); // Tamaño de página fijo en 12 elementos

  // Estados para manejar el héroe seleccionado y sus detalles
  const [selectedHero, setSelectedHero] = useState(null);
  const [heroDetails, setHeroDetails] = useState({ name: "", images: { lg: "" } });

  // Hook para controlar la visibilidad del modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Efecto para cargar héroes cuando cambia la página
  useEffect(() => {
    async function heros() {
      setHeros(await getHeros(size, pagination));
    }

    heros();
  }, [pagination]);

  // Efecto para cargar detalles del héroe cuando se selecciona uno
  useEffect(() => {
    async function fetchHeroDetails() {
      if (selectedHero) {
        const hero = await getHero(selectedHero);
        setHeroDetails(hero);
      }
    }

    if (selectedHero) {
      fetchHeroDetails();
      onOpen(); // Abre el modal automáticamente al seleccionar un héroe
    }
  }, [selectedHero]);

  return (
    <section className="flex flex-col items-center justify-center gap-4 pb-8 md:pb-10">
      {/* Switch para cambiar el tema (claro/oscuro) */}
      <div className="w-full flex justify-end my-4 mr-4">
        <ThemeSwitch />
      </div>

      {/* Título principal de la página */}
      <h1 className="text-3xl font-bold text-center mb-10">Heros Software Colombia</h1>

      {/* Componente que muestra la cuadrícula de héroes */}
      <CreateCard heros={heros} setSelectedHero={setSelectedHero} />

      {/* Componente de paginación */}
      <Pagination initialPage={1} total={heros.lastPage} onChange={(e) => setPagination(e)} />

      {/* Modal para mostrar detalles del héroe */}
      <Modal backdrop='blur' isOpen={isOpen} onClose={() => {
        setSelectedHero(null); // Limpia el héroe seleccionado al cerrar
        onClose();
      }}>
        <ModalContent>
          {(onClose) => (
            <>
              {/* Encabezado del modal con el nombre del héroe */}
              <ModalHeader className="flex flex-col gap-1">Hero {heroDetails.name}</ModalHeader>
              <ModalBody>
                {heroDetails.name ?
                  // Contenido del modal cuando los detalles están cargados
                  <div className="flex flex-col items-center justify-center gap-4">
                    {/* Imagen del héroe */}
                    <Image
                      className="w-52 h-80"
                      removeWrapper
                      alt={heroDetails.name}
                      src={heroDetails.images.md}
                    />

                    {/* Detalles del héroe */}
                    <div className="w-full flex flex-col justify-start">
                      {/* Chip para mostrar el género */}
                      <div className="flex justify-end">
                        <Chip color={heroDetails.appearance.gender === 'Female' ? 'danger' : 'warning'} variant="bordered">
                          {heroDetails.appearance.gender}
                        </Chip>
                      </div>

                      {/* Información biográfica (mostrada condicionalmente si existe) */}
                      {heroDetails.biography.fullName &&
                        <p className="font-bold mt-2">Fullname: <span className="font-normal">{heroDetails.biography.fullName}</span></p>
                      }

                      {heroDetails.appearance.race &&
                        <p className="font-bold mt-2">Race: <span className="font-normal">{heroDetails.appearance.race}</span></p>
                      }

                      {heroDetails.biography.firstAppearance &&
                        <p className="font-bold mt-2">First Appearance: <span className="font-normal">{heroDetails.biography.firstAppearance}</span></p>
                      }

                      {/* Estadísticas de poder en formato de grid */}
                      <p className="font-bold mt-4">Power Stats</p>
                      <div className="grid grid-cols-2 gap-2 m-2">
                        <p className="mx-2">Combat: <span>{heroDetails.powerstats.combat}</span></p>
                        <p className="mx-2">Durability: <span>{heroDetails.powerstats.durability}</span></p>
                        <p className="mx-2">Intelligence: <span>{heroDetails.powerstats.intelligence}</span></p>
                        <p className="mx-2">Power: <span>{heroDetails.powerstats.power}</span></p>
                        <p className="mx-2">Speed: <span>{heroDetails.powerstats.speed}</span></p>
                        <p className="mx-2">Strength: <span>{heroDetails.powerstats.strength}</span></p>
                      </div>
                    </div>
                  </div>
                  :
                  // Spinner de carga mientras se obtienen los detalles
                  <Spinner />
                }
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}