#include <v8.h>
#include <node.h>
#include <nan.h>
#include <pHash.h>
#include <sstream>
#include <fstream>
#include <cstdio>
using namespace node;
using namespace v8;
using namespace Nan;

template <typename T>
string NumberToString ( T Number ) {
    ostringstream ss;
    ss << Number;
    return ss.str();
}

template <typename T>
T StringToNumber ( const string &Text ) {
    istringstream ss(Text);
    T result;
    return ss >> result ? result : 0;
}

const char* toCString(const String::Utf8Value& value) {
    return *value ? *value : "<string conversion failed>";
}

bool fileExists(const char* filename) {
    ifstream file(filename);
    return file;
}

// https://gist.github.com/rvagg/bb08a8bd2b6cbc264056#file-phash-cpp
class PhashRequest : public NanAsyncWorker {
 public:
  PhashRequest(NanCallback *callback, string file)
    : NanAsyncWorker(callback), file(file), hash("0") {}
  ~PhashRequest() {}

  void Execute () {
    // prevent segfault on an empty file, see https://github.com/aaronm67/node-phash/issues/8
    const char* _file = file.c_str();
    if (!fileExists(_file)) {
        return;
    }

    string ret;
    try {
        ulong64 _hash = 0;
        ph_dct_imagehash(_file, _hash);
        hash = NumberToString(_hash);
    }
    catch(...) {
        // something went wrong with hashing
        // probably a CImg or ImageMagick IO Problem
    }
  }

  void HandleOKCallback () {
    NanScope();

    Handle<Value> argv[2];

    if (hash == "0") {
        argv[0] = NanError("Error getting image hash");
    }
    else {
        argv[0] = NanNull();
    }

    argv[1] = NanNew<String>(hash);

    callback->Call(2, argv);
  }

 private:
    string file;
    string hash;
};

NAN_METHOD(ImageHashAsync) {
    String::Utf8Value str(args[0]);
    NanCallback *callback = new NanCallback(args[1].As<Function>());
    NanAsyncQueueWorker(new PhashRequest(callback, string(*str)));
    NanReturnUndefined();
}

NAN_METHOD(HammingDistance) {
    NanScope();

    String::Utf8Value arg0(args[0]);
    String::Utf8Value arg1(args[1]);
    string aString = string(toCString(arg0));
    string bString = string(toCString(arg1));

    ulong64 hasha = StringToNumber<ulong64>(aString);
    ulong64 hashb = StringToNumber<ulong64>(bString);

    int distance = ph_hamming_distance(hasha,hashb);

    NanReturnValue(NanNew<Number>(distance));
}

void RegisterModule(Handle<Object> target) {
  NODE_SET_METHOD(target, "imageHash", ImageHashAsync);
  NODE_SET_METHOD(target, "hammingDistance", HammingDistance);
}

NODE_MODULE(pHash, RegisterModule);
