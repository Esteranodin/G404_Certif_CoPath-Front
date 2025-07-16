"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import campaignService from "@/lib/services/campaignService";
import DataStateHandler from "@/components/ui/DataStateHandler";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CampaignsPage() {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCampaigns = async () => {
            setLoading(true);
            try {
                const data = await campaignService.getAll();
                setCampaigns(data);
            } catch (err) {
                setError("Erreur lors du chargement des campagnes");
            } finally {
                setLoading(false);
            }
        };

        fetchCampaigns();
    }, []);

    return (
        <DataStateHandler
            loading={loading}
            error={error}
            data={campaigns}
            loadingMessage="Chargement des campagnes..."
            emptyMessage="Aucune campagne disponible pour le moment."
        >

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {campaigns.map((campaign) => (
                    <Card key={campaign.id} className="p-4 flex flex-col justify-between h-full">
                        <div>
                            <h2 className="text-xl font-semibold mb-2">{campaign.name}</h2>
                        </div>
                        <Link href={`/campaigns/${encodeURIComponent(campaign.name)}`}>
                            <Button variant="link" size="sm" className="w-full">
                                Voir les scénarios
                            </Button>
                        </Link>
                    </Card>
                ))}
            </div>
        </DataStateHandler>
    );
}