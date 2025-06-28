"use client";

import { useForms } from "@/hooks/useForms";
import { scenarioCreateSchema } from "@/lib/validation/validationZod"; // À créer si besoin
import { scenarioService } from "@/lib/services/scenarioService";
import FormContainer from "@/components/form/FormContainer";
import Form from "@/components/form/Form";

export default function ScenarioCreateForm({ onSuccess }) {
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
      // Ajoute d'autres champs ici si besoin (ex: campaign, tags, image)
    },
    onSuccessMessage: "Scénario créé avec succès !",
    onSuccessCallback: () => {
      reset();
      if (onSuccess) onSuccess();
    }
  });

  const handleCreate = submitForm(
    async (data) => {
      await scenarioService.create(data);
    }
  );

  return (
    <FormContainer title="Créer un scénario">
      <Form
        onSubmit={handleCreate}
        isSubmitting={isSubmitting}
        submitLabel="Créer"
        loadingLabel="Création en cours..."
      >
        {renderField("title", "Titre")}
        {renderField("content", "Description", "textarea")}
        {/* Ajoute ici d'autres champs si besoin */}
      </Form>
    </FormContainer>
  );
}