import React from 'react'
import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";
import Card from "../ui/Card.jsx";

const ProjectForm = (
    {
        title,
        buttonText,
        formData,
        setFormData,
        handleSubmit,
        buttonColor
    }
) => {
  return (
    <div>
      <Card className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            required
            placeholder="Title"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            type="text"
            required
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <Button type="submit" className={buttonColor}>
            {buttonText}
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default ProjectForm
