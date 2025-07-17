"use client";

import { useForms } from "@/hooks/useForms";
import { scenarioCreateSchema } from "@/lib/validation/validationZod";
import { scenarioService } from "@/lib/services/scenarioService";
import FormContainer from "@/components/form/FormContainer";
import Form from "@/components/form/Form";
import { useEffect, useState } from "react";
import { campaignService } from "@/lib/services/campaignService"; 

export default function ScenarioCreateForm({ onSuccess }) {
  const [campaigns, setCampaigns] = useState([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(true);

  const {
    renderField,
    submitForm,
    isSubmitting,
    errors,
    reset
  } = useForms({
    schema: scenarioCreateSchema,
    defaultValues: {
      title: "",
      content: "",
      campaign: "",
    },
    onSuccessMessage: "Scénario créé avec succès !",
    onSuccessCallback: () => {
      reset();
      if (onSuccess) onSuccess();
    }
  });

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const campaignsData = await campaignService.getAll();
        const formattedCampaigns = campaignsData.map(campaign => ({
          value: campaign.id,
          label: campaign.name || campaign.title
        }));
        setCampaigns(formattedCampaigns);
      } catch (error) {
        console.error("Erreur lors du chargement des campagnes:", error);
      } finally {
        setLoadingCampaigns(false);
      }
    };

    fetchCampaigns();
  }, []);

  const handleCreate = submitForm(
    async (data) => {
      await scenarioService.create(data);
    }
  );

  return (
    <FormContainer title="Publier un scénario">
      <Form
        onSubmit={handleCreate}
        isSubmitting={isSubmitting}
        submitLabel="Créer"
        loadingLabel="Création en cours..."
      >
        {renderField("title", "Titre")}
        {renderField("content", "Description", "textarea", {
          rows: 6,
          placeholder: "Décrivez votre scénario en détail..."
        })}
        {renderField("campaign", "Campagne", "choice", {
          choices: campaigns,
          placeholder: loadingCampaigns ? "Chargement des campagnes..." : "Sélectionnez une campagne",
          disabled: loadingCampaigns
        })}
      </Form>
    </FormContainer>
  );
}