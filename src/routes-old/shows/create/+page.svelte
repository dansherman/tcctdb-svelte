<form  method="POST" action="?/create" class="space-y-8 divide-y divide-gray-200">
  <div class="space-y-8 divide-y divide-gray-200">
    <div>
      <div class="sm:col-span-6">
        <label for="yamlText" class="block text-sm font-medium leading-6 text-gray-900">YAML</label>
        <div class="mt-2">
          <textarea id="yamlText" name="yamlText" rows="15" class="resize-y block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6 font-mono"></textarea>
        </div>
        <p class="mt-2 text-sm text-gray-500">YAML for the show's data.</p>
      </div>
    </div>
  </div>
  <button class="ml-3 inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
</form>
