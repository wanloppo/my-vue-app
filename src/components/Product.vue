<template>
  <div class="q-pa-md">
    <q-form @submit="submitForm" class="q-gutter-md row items-start">
      <q-input
        outlined
        v-model="dpcode"
        :dense="true"
        label="Depart"
        style="max-width: 180px"
        maxlength="2"
        size="2"
      />
      <q-input
        rounded
        outlined
        v-model="prcode"
        :dense="true"
        label="Code"
        style="max-width: 180px"
        maxlength="7"
        size="7"
      />
      <q-input
        rounded
        outlined
        v-model="prname"
        :dense="true"
        label="Name"
        style="max-width: 200px"
        maxlength="20"
        size="20"
      />
      <q-btn
        type="summit"
        color="grey-4"
        text-color="purple"
        glossy
        unelevated
        icon="search"
        label="Query"
      />
    </q-form>
    <q-option-group
      v-model="separator"
      inline
      class="q-mb-md"
      :options="[
        { label: 'Horizontal (default)', value: 'horizontal' },
        { label: 'Vertical', value: 'vertical' },
        { label: 'Cell', value: 'cell' },
        { label: 'None', value: 'none' },
      ]"
    />
    <q-table
      color="primary"
      card-class="bg-green-2 text-brown"
      table-class="text-grey-8"
      table-header-class="text-brown"
      flat
      title="Product"
      :rows="rows"
      :columns="columns"
      :rows-per-page-options="[10, 15, 30]"
      :separator="separator"
      row-key="row_id"
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
</template>
<script>
import axios from "axios";
import { ref } from "vue";
export default {
  data() {
    return {
      dpcode: "",
      prcode: "",
      prname: "",
      posts: [],
      errors: [],
      Drive: "%",
      FreePercent: 100,
      dp_code: "01",
      pr_code: "0001%",
      pr_name: "%",
      where: "",
      url: "https://fastifyapi.azurewebsites.net/product",
      wserver: "",
      wdrive: "",
      wfreepercent: "",
      and_case: "",
      sqlselect: "",
      where_case: "",
      firstName: "John",
      lastName: "Doe",
      offset: 0,
      limit: 1000,
      auth: "Authorization",
      access_token:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZWxsbyI6IndvcmxkIiwiaWF0IjoxNjUxMjgxNDUwfQ.xaf3jCTryVA1l6E5ZJ8sONs-AaQPqM2kBGOELxaSdhs",
      separator: ref("horizontal"),
      filter: ref(""),
      columns: [
        {
          name: "row_id",
          required: true,
          label: "No.",
          align: "center",
          field: "row_id",
        },
        {
          name: "dp_code",
          align: "center",
          label: "Depart",
          field: "dp_code",
          sortable: true,
        },
        {
          name: "dp_name",
          align: "center",
          label: "DepartName",
          field: "dp_name",
        },
        {
          name: "pr_code",
          align: "center",
          label: "Code",
          field: "pr_code",
          sortable: true,
        },
        {
          name: "pr_abb",
          align: "left",
          label: "Name",
          field: "pr_abb",
        },
        {
          name: "pr_engname",
          align: "left",
          label: "EngName",
          field: "pr_engname",
        },
        {
          name: "ba_nprice",
          align: "right",
          label: "RetailPrice",
          field: "ba_nprice",
          sortable: true,
        },
      ],
      rows: [],
    };
  },
  methods: {
    submitForm() {
      // this.dp_code = this.$refs.DepartCodeEl.value;
      this.dp_code = this.dpcode;
      // alert('Query ' + this.dp_code);
      this.dp_code = `${this.dp_code}%`;
      console.log("Query " + this.dpcode);
      // this.pr_code = this.$refs.ProductCodeEl.value;
      this.pr_code = this.prcode;
      this.pr_code = `${this.pr_code}%`;
      // this.pr_name = this.$refs.ProductNameEl.value;
      this.pr_name = this.prname;
      this.pr_name = `%${this.pr_name}%`;
      this.where_case = this.getsql();
      this.sqlselect = `${this.url}${this.where_case}`;

      axios
        // .get(this.sqlselect)
        .create({ headers: { Authorization: this.access_token } })
        .post(this.url, {
          dp_code: this.dp_code,
          pr_code: this.pr_code,
          pr_name: this.pr_name,
          offset: this.offset,
          // limit: this.limit,
        })
        .then((response) => {
          // JSON responses are automatically parsed.
          // this.posts = response.data;
          // console.log("post ");
          this.rows = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getsql() {
      if (this.dp_code.length > 0) {
        this.where = `dp_code=${this.dp_code}`;
      } else {
        this.where = `dp_code=%`;
      }
      // this.where = this.wserver;
      this.and_case = "&";
      if (this.pr_code.length > 0) {
        this.where = `${this.where}${this.and_case}pr_code=${this.pr_code}%`;
      } else {
        this.where = `${this.where}${this.and_case}pr_code=%`;
      }
      if (this.pr_name.length > 0) {
        this.where = `${this.where}${this.and_case}pr_name=%${this.pr_name}%`;
      } else {
        this.where = `${this.where}${this.and_case}pr_name=%`;
      }
      // console.log(this.where);
      return this.where;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      // Then specify how you want your dates to be formatted
      return new Intl.DateTimeFormat("th-TH", {
        day: "2-digit",
        // weekday: 'long',
        month: "2-digit",
        year: "numeric",
        // hour: '2-digit',
        // minute: '2-digit',
        // second: '2-digit',
        timeZone: "utc",
      }).format(date);
    },
    formatNumber(number, digit) {
      return new Intl.NumberFormat("en", {
        maximumFractionDigits: digit,
        minimumFractionDigits: digit,
      }).format(number);
    },
  },
  // Fetches posts when the component is created.
  created() {
    this.where_case = this.getsql();
    this.sqlselect = `${this.url}${this.where_case}`;
    axios
      // .get(this.sqlselect)
      .create({ headers: { Authorization: this.access_token } })
      .post(this.url, {
        dp_code: this.dp_code,
        pr_code: this.pr_code,
        pr_name: this.pr_name,
        offset: this.offset,
        // limit: this.limit,
      })
      .then((response) => {
        this.rows = response.data;
        // JSON responses are automatically parsed.
        // this.posts = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
};
</script>
