"use client"
// Indica que este es un componente de cliente en Next.js
import { Card, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Skeleton } from "@heroui/skeleton";
import { useState, useEffect } from "react";

// Componente principal que muestra tarjetas de héroes
export default function CreateCard({ heros, setSelectedHero }) {
    // Estado para almacenar la lista de héroes
    const [herosList, setHerosList] = useState([]);

    // Efecto para actualizar la lista de héroes cuando cambia la prop 'heros'
    useEffect(() => {
        setHerosList(heros.items)
    }, [heros]);

    // Función para crear elementos de esqueleto (placeholders) mientras se carga el contenido
    function CreateSkeleton() {
        let skeleton = []

        // Crea 8 elementos esqueleto para mostrar durante la carga
        for (let i = 0; i < 8; i++) {
            skeleton.push(
                <Card key={i} className="w-[200px] space-y-5 p-4" radius="lg">
                    {/* Esqueleto para la imagen */}
                    <Skeleton className="rounded-lg">
                        <div className="h-24 rounded-lg bg-default-300" />
                    </Skeleton>
                    <div className="space-y-3">
                        {/* Esqueletos para el texto */}
                        <Skeleton className="w-3/5 rounded-lg">
                            <div className="h-3 w-3/5 rounded-lg bg-default-200" />
                        </Skeleton>
                        <Skeleton className="w-4/5 rounded-lg">
                            <div className="h-3 w-4/5 rounded-lg bg-default-200" />
                        </Skeleton>
                        <Skeleton className="w-2/5 rounded-lg">
                            <div className="h-3 w-2/5 rounded-lg bg-default-300" />
                        </Skeleton>
                    </div>
                </Card>
            )
        }

        return skeleton
    }

    return (
        <>
            {/* Contenedor grid responsivo para las tarjetas */}
            <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                {
                    herosList ?
                        // Si hay héroes, mapea cada uno a una tarjeta
                        herosList.map((item) => (
                            <Card
                                key={item.id}
                                isFooterBlurred
                                isPressable
                                shadow="sm"
                                onPress={() => setSelectedHero(item.id)}
                            >
                                {/* Imagen del héroe */}
                                <Image
                                    removeWrapper
                                    alt={item.name}
                                    src={item.images.lg}
                                />
                                {/* Pie de tarjeta con información del héroe */}
                                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-center">
                                    <div>
                                        <p className="text-black font-bold text-md"> {item.name}</p>
                                        <p className="text-black text-tiny font-bold">Gender: <span>{item.appearance.gender}</span></p>
                                        <div className="flex flex-wrap justify-center mt-1">
                                            {/* Estadísticas de poder del héroe */}
                                            <p className="text-black text-tiny font-bold mx-2">Combat: <span>{item.powerstats.combat}</span></p>
                                            <p className="text-black text-tiny font-bold mx-2">Power: <span>{item.powerstats.power}</span></p>
                                        </div>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))
                        :
                        // Si no hay héroes, muestra los esqueletos de carga
                        CreateSkeleton()
                }
            </div>
        </>
    );
}