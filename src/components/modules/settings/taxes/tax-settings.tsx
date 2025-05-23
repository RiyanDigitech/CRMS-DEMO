import { useState, useEffect } from "react";
import { Card, Button, message } from "antd";
import { TaxRuleModal } from "./tax-rule-modal";
import { TaxRulesTable } from "./tax-rule-table";
import { taxApi } from "@/services/tax.service";
import { Tax, TaxCriteria } from "@/lib/types/settings";
import { SettingsLayout } from "../settings-layout";
import { BaseButton } from "@/components/ui/base-button";
import { PlusIcon } from "lucide-react";

export default function TaxSettings() {
  const [taxRules, setTaxRules] = useState<Tax[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<Tax | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTaxRules();
  }, []);

  const fetchTaxRules = async () => {
    setLoading(true);
    try {
      const rules = await taxApi.getTaxRules();
      setTaxRules(rules.data);
    } catch (error) {
      message.error("Failed to fetch tax rules");
    } finally {
      setLoading(false);
    }
  };

  const handleAddRule = async (rule: Omit<Tax, "id">) => {
    try {
      const newRule = await taxApi.addTaxRule(rule);
      setTaxRules([...taxRules, newRule.data]);
      setIsModalOpen(false);
      message.success("Tax Rule Added Successfully");
    } catch (error) {
      message.error("Failed To Add Tax Rule");
    }
  };

  const handleUpdateRule = async (id: number, rule: Omit<Tax, "id">) => {
    try {
      const updatedRule = await taxApi.updateTaxRule(id, rule);
      setTaxRules(
        taxRules.map((r) =>
          Number(r.id) === Number(id) ? updatedRule.data : r
        )
      );
      setIsModalOpen(false);
      setEditingRule(null);
      message.success("Tax Updated Successfully");
    } catch (error) {
      message.error("Failed To Update");
    }
  };

  const handleDeleteRule = async (id: number) => {
    try {
      await taxApi.deleteTaxRule(id);
      setTaxRules(taxRules.filter((r) => r.id !== id));
      message.success("Tax Deleted Successfully");
    } catch (error) {
      message.error("Failed To Delete Tax");
    }
  };

  const handleEdit = (rule: Tax) => {
    setEditingRule(rule);
    setIsModalOpen(true);
  };

  return (
    <SettingsLayout>
      <Card
        title="Tax Management"
        extra={
          <BaseButton
            size={"lg"}
            onClick={() => {
              setEditingRule(null);
              setIsModalOpen(true);
            }}
            className="flex gap-2 items-center my-3"
          >
            <PlusIcon />
            Add New Rule
          </BaseButton>
        }
        style={{ maxWidth: "1200px", margin: " auto" }}
      >
        <p className="text-gray-500 mb-4">
          Manage custom tax rules for your orders
        </p>
        <TaxRulesTable
          rules={taxRules}
          onEdit={handleEdit}
          onDelete={handleDeleteRule}
          loading={loading}
        />
        <TaxRuleModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingRule(null);
          }}
          onSubmit={
            editingRule
              ? (rule) => handleUpdateRule(editingRule.id, rule)
              : handleAddRule
          }
          initialData={editingRule}
        />
      </Card>
    </SettingsLayout>
  );
}
