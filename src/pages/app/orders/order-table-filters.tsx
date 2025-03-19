import { Button } from "@/components/ui/button";
import { InputHookForm } from "@/components/ui/input-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { z } from "zod";

const orderFiltersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
});

type OrderFiltersSchema = z.infer<typeof orderFiltersSchema>;

export default function OrderTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");
  const customerName = searchParams.get("customerName");
  const status = searchParams.get("status");

  const orderFilterForm = useForm<OrderFiltersSchema>({
    resolver: zodResolver(orderFiltersSchema),
    defaultValues: {
      orderId: orderId ?? "",
      customerName: customerName ?? "",
      status: status ?? "all",
    },
  });

  const { handleSubmit, control, reset } = orderFilterForm;

  function handleFilter({ orderId, customerName, status }: OrderFiltersSchema) {
    setSearchParams((state) => {
      if (orderId) {
        state.set("orderId", orderId);
      } else {
        state.delete("orderId");
      }

      if (customerName) {
        state.set("customerName", customerName);
      } else {
        state.delete("customerName");
      }

      if (status) {
        state.set("status", status);
      } else {
        state.delete("status");
      }

      state.set("page", "1");

      return state;
    });
  }

  function handleCleanFilters() {
    setSearchParams((state) => {
      state.delete("customerName");
      state.delete("orderId");
      state.delete("status");
      state.set("page", "1");

      reset({
        customerName: "",
        orderId: "",
        status: "all",
      });

      return state;
    });
  }

  return (
    <FormProvider {...orderFilterForm}>
      <form
        onSubmit={handleSubmit(handleFilter)}
        className="flex items-center gap-2"
      >
        <span className="text-sm font-semibold">Filtros</span>

        <InputHookForm
          name="orderId"
          placeholder="ID do pedido"
          className="h-8 w-auto"
        />

        <InputHookForm
          name="customerName"
          placeholder="Nome do cliente"
          className="h-8 w-[320px]"
        />

        <Controller
          name="status"
          control={control}
          render={({ field: { name, onChange, value, disabled } }) => {
            return (
              <Select
                defaultValue="all"
                name={name}
                onValueChange={onChange}
                value={value}
                disabled={disabled}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos status</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="canceled">Cancelado</SelectItem>
                  <SelectItem value="processing">Em preparo</SelectItem>
                  <SelectItem value="delivering">Em entrega</SelectItem>
                  <SelectItem value="delivered">Entregue</SelectItem>
                </SelectContent>
              </Select>
            );
          }}
        />

        <Button type="submit" variant="secondary" size="xs">
          <Search className="mr-2 h-4 w-4" />
          Filtrar resultados
        </Button>
        <Button
          type="button"
          variant="outline"
          size="xs"
          onClick={handleCleanFilters}
        >
          <X className="mr-2 h-4 w-4" />
          Remover filtros
        </Button>
      </form>
    </FormProvider>
  );
}
